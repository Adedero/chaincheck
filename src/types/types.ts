export interface InitializationOptions {
  uninterrupted: boolean;
  strict: boolean;
}

export interface ValidationOptions {
  message?: string;
}

export type ValueType =
  'any'
  | 'array'
  | 'boolean'
  | 'date'
  | 'function'
  | 'null'
  | 'number'
  | 'object'
  | 'string'
  | 'undefined'
  | 'unknown';

export interface ValidationResult<T> {
  value: T;
  originalValue: any;
  isValid: boolean;
  errors: ValidationError[];
  validationCount: {
    applied: number;
    passed: number;
    failed: number;
  };
  transformations: string[];
}

export interface ValidationError {
  rule: string;
  expected: string[];
  received: ValueType;
  message?: string;
}

export type ValidationRule<T> = (
  value: any,
  type: ValueType,
) => Generator<ValidationRuleData, ValidationRuleResult<T>, unknown>;

export interface ValidationRuleResult<T> {
  value: T;
  isValid: boolean;
  rule: string;
  expected: ValueType[];
  received: ValueType;
  message?: string;
  transformation?: string;
}

export interface ValidationRuleData {
  rule: string;
  expected: ValueType[];
  received: ValueType;
}

export type ChaincheckErrorType =
  | 'ValidationError'
  | 'TypeMismatchError'
  | 'InvalidParameterError'
  | 'MissingValidationOptionsError'
  | 'TransformationError'
