import { ValidationRuleData, ValidationRuleResult, ValueType } from "../../types/types";
import { IsUUIDOptions } from "../../types/options";
import { regex } from './../../config/constants';

export function* isUUID<T>(
  value: any,
  type: ValueType,
  options?: IsUUIDOptions,
): Generator<ValidationRuleData, ValidationRuleResult<T>, unknown> {

  const version = options?.version;

  const data: ValidationRuleData = {
    rule: "isUUID",
    expected: ["string"] as ValueType[],
    received: type,
  };

  yield data;

  let pattern : RegExp = regex.UUID;

  if (version) pattern = regex[`UUID_${version}`];


  const isValid = pattern.test(value);

  const defaultMessage = version 
    ? `Value must be a valid UUID of version ${version}.`
    : `Value must be a valid UUID.`;

  const message = options?.message ?? defaultMessage;

  return {
    value,
    isValid,
    ...data,
    message: isValid ? "" : message,
  };
}
