import ChaincheckError from "../../lib/ChaincheckError";
import { StartsAndEndsWIthOptions } from "../../types/options";
import { ValidationRuleData, ValidationRuleResult, ValueType } from "../../types/types";

export function* startsWith<T>(
  value: any,
  type: ValueType,
  input: string | number,
  options?: StartsAndEndsWIthOptions
): Generator<ValidationRuleData, ValidationRuleResult<T>, unknown> {

  const data: ValidationRuleData = {
    rule: "startsWith",
    expected: ["string", "number"] as ValueType[],
    received: type,
  };

  // Validate input type for startsWith rule
  if (typeof input !== "string" && typeof input !== "number") {
    throw new ChaincheckError(
      "Invalid input for startsWith validation rule. Expected a string or number.",
      "InvalidParameterError",
      data
    );
  }

  yield data;

  let isValid = false;
  let message = options?.message ?? `Value must start with "${input}"`;
  const forced = options?.forced ?? true;

  // Handle forced logic and type coercion
  const search = typeof input === "number" ? input.toString() : input;

  // For string type, check if it starts with the input
  if (type === "string") {
    if (forced || typeof input === "string") {
      isValid = (value as string).startsWith(search);
    } else {
      throw new ChaincheckError(
        "Invalid input for startsWith validation rule. Expected a string parameter when value is a string. Try setting 'forced' option to true to coerce types.",
        "InvalidParameterError",
        data
      );
    }
  }


  // For number type, check if it starts with the input (after converting both to strings)
  if (type === "number") {
    if (forced) {
      isValid = (value.toString()).startsWith(search);
    } else {
      throw new ChaincheckError(
        "Invalid input for startsWith validation rule. Expected a number parameter when value is a number. Try setting 'forced' option to true to coerce types.",
        "InvalidParameterError",
        data
      );
    }
  }

  return {
    value,
    isValid,
    ...data,
    message: isValid ? "" : message
  };
}
