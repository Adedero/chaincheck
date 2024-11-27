import ChaincheckError from "../../lib/ChaincheckError";
import { ToNumberOptions } from "../../types/options";
import { ValidationRuleData, ValidationRuleResult, ValueType } from "../../types/types";

export function* toNumber<T>(
  value: any,
  type: ValueType,
  options?: ToNumberOptions
): Generator<ValidationRuleData, ValidationRuleResult<T>, unknown> {
  
  const forced = options?.forced ?? false;

  const data: ValidationRuleData = {
    rule: "toNumber",
    expected: ["any"] as ValueType[],
    received: type,
  };

  yield data;

  // Safe check for numeric conversion
  const convertedValue = Number(value);
  const isValid = typeof convertedValue === "number" && !Number.isNaN(convertedValue);

  let finalValue: number = 0;

  if (isValid) {
    finalValue = convertedValue;
  } else if (forced) {
    finalValue = 0; // Force conversion to 0
  } else {
    throw new ChaincheckError(
      `Transformation failed for rule: ${data.rule}. Value cannot be converted to a valid number. Try enabling the "forced" option.`,
      "TransformationError",
      data,
    )
    //finalValue = NaN; // Invalid conversion
  }

  const message = options?.message ?? "Value cannot be converted to a valid number";

  return {
    value: finalValue as T,
    isValid: isValid || forced, // Forced values are considered valid
    ...data,
    message: isValid ? "" : message,
    transformation: "to_number"
  };
}
