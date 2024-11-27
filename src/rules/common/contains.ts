import ChaincheckError from "../../lib/ChaincheckError";
import { ContainsOptions } from "../../types/options";
import { ValidationRuleData, ValidationRuleResult, ValueType } from "../../types/types";
import { deepContains } from "../../utils/helpers";

export function* contains<T>(
  value: any,
  type: ValueType,
  input: any,
  options?: ContainsOptions
  
): Generator<ValidationRuleData, ValidationRuleResult<T>, unknown> {

  const data: ValidationRuleData = {
    rule: "contains",
    expected: ["string", "array", "object"] as ValueType[],
    received: type,
  };

  yield data;

  let isValid = false;
  let message = options?.message ?? `Value must contain "${input}"`;

  const deep = options?.deep ?? false;

  const check = options?.check ?? "keys";

  if (!check || (check !== "keys" && check !== "values")) {
    throw new ChaincheckError(
      "Invalid 'check' option. It must be 'keys' or 'values'.",
      "InvalidParameterError",
      data
    )
  }

  // For strings, we check if the substring is present
  if (type === "string") {
    isValid = (value as string).includes(input as string);
  }
  // For arrays, we check if the array contains the element
  if (type === "array") {
    if (!deep) isValid = (value as any[]).includes(input);
    if (deep) isValid = deepContains(value, input);
  }
  // For objects, we check if the object contains the key or the value (depending on options)
  if (type === "object") {
    if (!deep) isValid = Object[check](value).includes(input);
    if (deep) isValid = deepContains(value, input, check);
  }

  return {
    value,
    isValid,
    ...data,
    message: isValid ? "" : message
  };
}


