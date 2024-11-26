import { regex } from "../../config/constants";
import { ValidationOptions, ValidationRuleResult, ValueType } from "../../types/types";
import { handleTypeMismatch } from "../../utils/helpers";

export const isAlpha = <T>(
  value: any,
  type: ValueType,
  options?: ValidationOptions
) : ValidationRuleResult<T> => {
  const data = {
    rule: "isAlpha",
    expected: ["string"] as ValueType[],
    received: type
  }

  const error = handleTypeMismatch(data);
  if (error) throw error;

  const message = options?.message ?? 'Value must contain only alphabetic characters';


  const isValid = regex.ALPHA_REGEX.test(value as string);

  return {
    value,
    isValid,
    ...data,
    message: isValid ? '' : message
  }
};