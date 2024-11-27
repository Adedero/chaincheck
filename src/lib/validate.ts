import {
  InitializationOptions,
  ValidationError,
  ValidationRule,
  ValidationRuleResult,
  ValueType,
} from '../types/types';
import { getValueType } from '../utils/helpers';
import ChaincheckError from './ChaincheckError';

export const validate = <T>(
  rules: ValidationRule<T>[],
  value: any,
  originalValue: any,
  config: InitializationOptions,
) => {
  let finalValue = value;
  let currentType: ValueType = getValueType(value);
  const errors: ValidationError[] = [];
  let applied: number = 0;
  let failed: number = 0;
  let passed: number = 0;
  const transformations: string[] = [];

  for (const rule of rules) {
    applied++;

    let result: ValidationRuleResult<T> | null = null;

    try {
      const gen = rule(finalValue, currentType);
      const data = gen.next().value;

      if (!data.expected.includes("any") && !data.expected.includes(currentType)) {
        throw new ChaincheckError(
          `Invalid type for rule: ${data.rule}. Expected one of "${data.expected.join(', ')}" but received "${currentType}" instead.`,
          "TypeMismatchError",
          {
            rule: data.rule,
            expected: data.expected,
            received: currentType,
          }
        );
      }
      
      result = gen.next().value as ValidationRuleResult<T>;

      if (result.isValid) {
        finalValue = result.value;
        passed++;
        if (result.transformation) {
          transformations.push(result.transformation);
          currentType = getValueType(result.value);
        }
      }

      if (!result.isValid) {
        failed++;

        const error: ValidationError = {
          rule: result.rule,
          expected: result.expected,
          received: result.received,
          message:  result.message ?? `Validation failed for rule: ${result.rule}`,
        };

        errors.push(error);

        if (!config.uninterrupted) {
          return {
            value: result.value,
            originalValue: originalValue,
            isValid: false,
            errors,
            validationCount: {
              applied,
              failed,
              passed,
            },
            transformations,
          };
        }
      }
    } catch (err) {
      if (config.strict) {
        throw err as ChaincheckError;
      }
      const error = err as ChaincheckError;
      errors.push({
        rule: error.info?.rule ?? 'unknown',
        expected: error.info?.expected ?? ['unknown'],
        received: error.info?.received ?? 'unknown',
        message: `Error: ${error.message ?? 'Validation failed'}`,
      });
    }
  }

  return {
    value: finalValue as T,
    originalValue: originalValue,
    isValid: errors.length === 0,
    errors,
    validationCount: {
      applied,
      failed,
      passed,
    },
    transformations,
  };
};
