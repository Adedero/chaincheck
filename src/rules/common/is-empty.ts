import { ValidationOptions, ValidationRuleData, ValidationRuleResult, ValueType } from "../../types/types";

export function* isEmpty <T>(
  value: any,
  type: ValueType,
  options?: ValidationOptions
) : Generator<ValidationRuleData, ValidationRuleResult<T>, unknown> {
  
  const data = {
    rule: "isEmpty",
    expected: ["string", "array", "object"] as ValueType[],
    received: type
  }
  yield data;

  let message = options?.message;

  const isValid =
    (type === 'string' && (value as string).trim().length === 0) ||
    (type === 'array' && Array.isArray(value) && value.length === 0) ||
    (type === 'object' &&
      value !== null &&
      Object.keys(value as object).length === 0);

  message = message ?? 'Value must be empty';

  return {
    value,
    isValid,
    ...data,
    message: isValid ? '' : message,
  };

};