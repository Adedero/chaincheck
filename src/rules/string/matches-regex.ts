import ChaincheckError from "../../lib/ChaincheckError";
import { ValidationOptions, ValidationRuleData, ValidationRuleResult, ValueType } from "../../types/types";

export function* matchesRegex <T>(
  value: any,
  type: ValueType,
  input: RegExp,
  options: ValidationOptions
) : Generator<ValidationRuleData, ValidationRuleResult<T>, unknown> {

  const data = {
    rule: "matchesRegex",
    expected: ["string"] as ValueType[],
    received: type
  };

  yield data;

  if (!input || Object.prototype.toString.call(value) !== '[object RegExp]') {
    throw new ChaincheckError(
      'Input parameter is missing or invalid. Input should be a regular expression',
      'InvalidParemeterError',
      data,
    );
  }

  let message = options?.message ?? `Value must match the regular expression: "${input}"`;
  const isValid: boolean = input.test(value);
  const defaultMessage: string = isValid ? '' : message;

  return {
    value,
    isValid,
    ...data,
    message: defaultMessage
  }
}