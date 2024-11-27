import { regex } from "../../config/constants";
import { ValidationOptions, ValidationRuleData, ValidationRuleResult, ValueType } from "../../types/types";

export function* isNumeric <T>(
  value: any,
  type: ValueType,
  options: ValidationOptions
) : Generator<ValidationRuleData, ValidationRuleResult<T>, unknown> {

  const data = {
    rule: "isNumeric",
    expected: ["string"] as ValueType[],
    received: type
  };

  yield data;

  let message = options?.message ?? 'Value must contain only numeric characters';
  const isValid: boolean = regex.NUMERIC_REGEX.test(value);
  const defaultMessage: string = isValid ? '' : message;

  return {
    value,
    isValid,
    ...data,
    message: defaultMessage
  }
}