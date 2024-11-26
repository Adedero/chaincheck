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

  private addRule(validationFunc: Function, ...args: any[]): this {
    this.rules.push((value) => validationFunc(value, getValueType(value), ...args));
    return this;
  }

  //Common rules
   isEmpty(options?: ValidationOptions): this {
    return this.addRule(validations.isEmpty, options);
  }

  isNotEmpty(options?: ValidationOptions): this {
    return this.addRule(validations.isNotEmpty, options);
  }

  hasLength(input: number, options?: ValidationOptions): this {
    return this.addRule(validations.hasLength, input, options);
  }

  minLength(input: number, options?: ValidationOptions): this {
    return this.addRule(validations.minLength, input, options);
  }

  maxLength(input: number, options?: ValidationOptions): this {
    return this.addRule(validations.maxLength, input, options);
  }

}
