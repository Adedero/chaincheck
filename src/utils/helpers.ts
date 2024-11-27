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

export const handleInvalidParameter = (param: any) => {

};


export function deepContains(value: any, search: any, key?: "keys" | "values"): boolean {
  key = key ?? "keys"
  if (Array.isArray(value)) {
    return value.some((item) => deepContains(item, search));
  }
  if (value && typeof value === "object") {
    return Object[key](value).some((item) => deepContains(item, search, key));
  }
  return value === search;
}

export function deepStartsWith(value: any, search: any) : boolean {
  if (Array.isArray(value)) {
    if (Array.isArray(value[0])) return deepStartsWith(value, search)
    return value[0] === search;
  }
  return false;
}