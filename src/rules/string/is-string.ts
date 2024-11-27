import { ValidationOptions, ValidationRuleData, ValidationRuleResult, ValueType } from "../../types/types";

export function* isString <T>(
  value: any,
  type: ValueType,
  options?: ValidationOptions
) : Generator<ValidationRuleData, ValidationRuleResult<T>, unknown> {

  const data = {
    rule: "isString",
    expected: ['array', 'boolean', 'date', 'function', 'null', 'number', 'object', 'string', 'undefined', 'unknown'] as ValueType[],
    received: type
  };

  yield data;

  let message = options?.message ?? 'Value must be a string';

  const isValid: boolean = (typeof value === 'string') && (type === 'string');
  const defaultMessage: string = isValid ? '' : message;

  return {
    value,
    isValid,
    ...data,
    message: defaultMessage,
  }
};