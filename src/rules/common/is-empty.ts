import {
  ValidationOptions,
  ValidationRuleResult,
  ValueType,
} from '../../types/types';
import { handleTypeMismatch } from '../../utils/helpers';

export const isEmpty = <T>(
  value: any,
  type: ValueType,
  options?: ValidationOptions,
): ValidationRuleResult<T> => {
  const data = {
    rule: 'isEmpty',
    expected: ['string', 'array', 'object'] as ValueType[],
    received: type,
  };

  let message = options?.message;

  const error = handleTypeMismatch(data);
  if (error) throw error;

  const isValid =
    (type === 'string' && (value as string).trim().length === 0) ||
    (type === 'array' && Array.isArray(value) && value.length === 0) ||
    (type === 'object' &&
      value !== null &&
      Object.keys(value as object).length === 0);

  message = message ?? 'Value must be empty';

  return {
    value,
    isValid,
    ...data,
    message: isValid ? '' : message,
  };
};
