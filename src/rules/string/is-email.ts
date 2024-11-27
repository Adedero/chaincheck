import { regex } from "../../config/constants";
import { ValidationOptions, ValidationRuleData, ValidationRuleResult, ValueType } from "../../types/types";

export function* isEmail <T>(
  value: any,
  type: ValueType,
  options: ValidationOptions
) : Generator<ValidationRuleData, ValidationRuleResult<T>, unknown> {

  const data = {
    rule: "isEmail",
    expected: ["string"] as ValueType[],
    received: type
  };

  yield data;

  let message = options?.message ?? 'Value must be a valid email address';
  const isValid: boolean = regex.EMAIL_REGEX.test(value);
  const defaultMessage: string = isValid ? '' : message;

  return {
    value,
    isValid,
    ...data,
    message: defaultMessage
  }
}