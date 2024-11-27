import ChaincheckError from '../../lib/ChaincheckError';
import {
  ValidationOptions,
  ValidationRuleData,
  ValidationRuleResult,
  ValueType,
} from '../../types/types';

export function* hasLength <T>(
  value: any,
  type: ValueType,
  input: number,
  options?: ValidationOptions,
): Generator<ValidationRuleData, ValidationRuleResult<T>, unknown> {

  const data = {
    rule: 'hasLength',
    expected: ['string', 'array', 'number', 'object'] as ValueType[],
    received: type,
  };

  yield data;

  if (!input || typeof input !== 'number') {
    throw new ChaincheckError(
      'Input parameter is missing or invalid. Input should be a number',
      'InvalidParemeterError',
      data,
    );
  }

  let message = options?.message ??  `Value must have length equal to ${input}`;

  let length: number | null = null;

  if (type === 'string' || Array.isArray(value)) {
    length = (value as Array<unknown> | string).length;
  } else if (type === 'object' && value !== null) {
    length = Object.keys(value as object).length;
  } else if (value instanceof Set || value instanceof Map) {
    length = value.size;
  } else if (typeof value === 'number') {
    length = value.toString().length;
  }

  if (length === null) {
    throw new ChaincheckError(
      `Invalid type for rule: ${data.rule}. Expected one of "${data.expected.join(', ')}" but got "${data.received}" instead.`,
      "TypeMismatchError",
      data,
    );
  }

  const isValid = length === input;
  const defaultMessage = isValid ? '' : message

  return {
    value,
    isValid,
    ...data,
    message: defaultMessage,
  };
};
