import { regex } from "../../config/constants";
import { ValidationOptions, ValidationRuleData, ValidationRuleResult, ValueType } from "../../types/types";

export function* isAlphaNum <T>(
  value: any,
  type: ValueType,
  options: ValidationOptions
) : Generator<ValidationRuleData, ValidationRuleResult<T>, unknown> {

  const data = {
    rule: "isAlphaNum",
    expected: ["string"] as ValueType[],
    received: type
  };

  yield data;

  let message = options?.message ?? 'Value must contain only alpha-numeric characters';
  const isValid: boolean = regex.ALPHA_NUMERIC_REGEX.test(value);
  const defaultMessage: string = isValid ? '' : message;

  return {
    value,
    isValid,
    ...data,
    message: defaultMessage
  }
}