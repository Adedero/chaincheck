import ChaincheckError from "../../lib/ChaincheckError";
import { ValidationOptions, ValidationRuleData, ValidationRuleResult, ValueType } from "../../types/types";

export function* matches <T>(
  value: any,
  type: ValueType,
  input: string,
  options: ValidationOptions
) : Generator<ValidationRuleData, ValidationRuleResult<T>, unknown> {

  const data = {
    rule: "matches",
    expected: ["string"] as ValueType[],
    received: type
  };

  yield data;

  if (!input || typeof input !== 'string') {
    throw new ChaincheckError(
      'Input parameter is missing or invalid. Input should be a string',
      'InvalidParameterError',
      data,
    );
  }

  let message = options?.message ?? `Value must match the string: "${input}"`;
  const isValid: boolean = value === input;
  const defaultMessage: string = isValid ? '' : message;

  return {
    value,
    isValid,
    ...data,
    message: defaultMessage
  }
}