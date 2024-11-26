import ChaincheckError from '../../lib/ChaincheckError';
import {
  ValidationOptions,
  ValidationRuleResult,
  ValueType,
} from '../../types/types';
import { handleTypeMismatch } from '../../utils/helpers';

export const hasLength = <T>(
  value: any,
  type: ValueType,
  input: number,
  options?: ValidationOptions,
): ValidationRuleResult<T> => {
  const data = {
    rule: 'hasLength',
    expected: ['string', 'array', 'number', 'object'] as ValueType[],
    received: type,
  };

  if (!input || typeof input !== 'number') {
    throw new ChaincheckError(
      'Input parameter is missing or invalid. Input should be a number',
      data,
      'InvalidParemeterError',
    );
  }

  let message = options?.message;

  const error = handleTypeMismatch(value, data, message);
  if (error) return error;

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

  if (length === null)
    return {
      value,
      isValid: false,
      ...data,
      message: message ?? 'Value must be a string, number, array, or object',
    };

  const isValid = length === input;
  const defaultMessage = isValid ? '' : message ?? `Value must have length equal to ${input}`

  return {
    value,
    isValid,
    ...data,
    message: defaultMessage,
  };
};
