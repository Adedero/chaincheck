import { ValidationOptions, ValidationRuleResult, ValueType } from "../../types/types";
import { handleTypeMismatch } from "../../utils/helpers";

export const isString = <T>(
  value: any,
  type: ValueType,
  options?: ValidationOptions
) : ValidationRuleResult<T> => {

  const data = {
    rule: "isString",
    expected: ['any'] as ValueType[],
    received: type
  };

  const error = handleTypeMismatch(data);
  if (error) throw error;

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