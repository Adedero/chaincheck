import ChaincheckError from "../../lib/ChaincheckError";
import { ValidationOptions, ValidationRuleData, ValidationRuleResult, ValueType } from "../../types/types";

// URL regex pattern (common URL formats)
const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

export function* isURL<T>(
  value: any,
  type: ValueType,
  options?: ValidationOptions
): Generator<ValidationRuleData, ValidationRuleResult<T>, unknown> {

  const data: ValidationRuleData = {
    rule: "isURL",
    expected: ["string"] as ValueType[],
    received: type,
  };

  yield data;

  let isValid = urlRegex.test(value);
  const message = options?.message ?? "Value must be a valid URL.";

  return {
    value,
    isValid,
    ...data,
    message: isValid ? "" : message,
    transformation: "isUrl",
  };
}
