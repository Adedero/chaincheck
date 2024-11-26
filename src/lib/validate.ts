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
      result = rule(finalValue, currentType);

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
          message: '',
        };

        if (!result.expected.includes(result.received)) {
          error.message =
            (result.message ?? result.expected.length > 1)
              ? `Value must be one of ${result.expected.join(', ')}`
              : `Value must be ${result.expected[0]}`;
        } else {
          error.message =
            result.message ?? `Validation failed for rule: ${result.rule}`;
        }

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
        rule: error.rule,
        expected: error.expected ?? ['unknown'],
        received: error.received ?? 'unknown',
        message: `Error: ${error.message ?? 'Validation failed'}`,
      });
    }
  }

  return {
    value: value as T,
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
