import { regex } from "../../config/constants";
import { ValidationOptions, ValidationRuleData, ValidationRuleResult, ValueType } from "../../types/types";

export function* isAlpha <T>(
  value: any,
  type: ValueType,
  options: ValidationOptions
) : Generator<ValidationRuleData, ValidationRuleResult<T>, unknown> {

  const data = {
    rule: "isAlpha",
    expected: ["string"] as ValueType[],
    received: type
  };

  yield data;

  let message = options?.message ?? 'Value must contain only alphabetic characters';
  const isValid: boolean = regex.ALPHA_REGEX.test(value);
  const defaultMessage: string = isValid ? '' : message;

  return {
    value,
    isValid,
    ...data,
    message: defaultMessage
  }
}