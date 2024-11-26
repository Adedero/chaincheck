import { ValidationOptions, ValidationRuleResult, ValueType } from "../../types/types";

export const isString = <T>(
  value: any,
  type: ValueType,
  options?: ValidationOptions
) : ValidationRuleResult<T> => {

  const data = {
    rule: "isString",
    expected: ['array', 'boolean', 'date', 'function', 'null', 'number', 'object', 'string', 'undefined', 'unknown'] as ValueType[],
    received: type
  };

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