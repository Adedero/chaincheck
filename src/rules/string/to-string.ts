import ChaincheckError from "../../lib/ChaincheckError";
import { ValidationRuleData, ValidationRuleResult, ValidationOptions, ValueType } from "../../types/types";

export function* toString<T>(
  value: any,
  type: ValueType,
  options?: ValidationOptions
): Generator<ValidationRuleData, ValidationRuleResult<T>, unknown> {
  const data: ValidationRuleData = {
    rule: "toString",
    expected: ["any"] as ValueType[],
    received: type,
  };

  yield data;

  // Attempt to convert to string
  let finalValue: string;

  try {
    finalValue = String(value);
  } catch (error) {
    throw new ChaincheckError(
      `Transformation failed for rule: ${data.rule}. Value cannot be converted to a valid string.`,
      "TransformationError",
      data
    );
  }

  // Validation for whether the final value is a string
  const isValid = typeof finalValue === "string";

  const message = options?.message ?? "Value cannot be converted to a valid string";

  return {
    value: finalValue as T,
    isValid,
    ...data,
    message: isValid ? "" : message,
    transformation: "to_string",
  };
}
