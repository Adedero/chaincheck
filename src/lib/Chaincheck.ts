import {
  InitializationOptions,
  ValidationOptions,
  ValidationResult,
  ValidationRule,
} from '../types/types';
import { validate } from './validate';
import { getValueType } from '../utils/helpers';
import * as validations from '../rules/index';

export class Chaincheck<T> {
  private value: any;
  private originalValue: any;
  private readonly config: InitializationOptions;
  private rules: ValidationRule<T>[] = [];

  constructor(value: any, config?: InitializationOptions) {
    this.originalValue = value;
    this.value = value;

    const uninterrupted = config?.uninterrupted ?? false;
    const strict = config?.strict ?? true;
    this.config = { uninterrupted, strict };
  }

  validate(): ValidationResult<T> {
    const result = validate(
      this.rules,
      this.value,
      this.originalValue,
      this.config,
    );
    return result;
  }

  //Common rules
  hasLength(input: number, options?: ValidationOptions): this {
    this.rules.push((value) => 
      validations.hasLength(value, getValueType(value), input, options)
    )
    return this;
  }

  isNotEmpty(options?: ValidationOptions) : this {
    this.rules.push((value) => 
      validations.isNotEmpty(value, getValueType(value), options)
    )
    return this;
  }
}
