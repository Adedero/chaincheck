import ChaincheckError from '../lib/ChaincheckError';
import { ValueType } from '../types/types';

export const getValueType = (value: unknown): ValueType => {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'function') return 'function';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string') return 'string';
  if (typeof value === 'undefined') return 'undefined';
  if (value instanceof Date) return 'date';
  if (
    typeof value === 'object' &&
    Object.prototype.toString.call(value) === '[object Object]'
  )
    return 'object';
  return 'unknown';
};

export const handleTypeMismatch = (data: { rule: string; expected: ValueType[]; received: ValueType }) => {
  if (!data.expected.includes('any') && !data.expected.includes(data.received)) {
    const message = (data.expected.length > 1)
    ? `Value must be one of ${data.expected.join(', ')}`
    : `Value must be ${data.expected[0]}`;

    const error = new ChaincheckError(message, data, 'TypeMismatchError');
    return error;
  }
  return null;
};

export const handleInvalidParameter = (param: any) => {

};