import {
  InitializationOptions,
  ValidationOptions,
  ValidationResult,
  ValidationRule,
} from '../types/types';
import { validate } from './validate';
import { getValueType } from '../utils/helpers';
import * as validations from '../rules/index';
import { ContainsOptions, IsUUIDOptions, ToNumberOptions } from '../types/options';

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
    this.rules.push((value) =>
      validationFunc(value, getValueType(value), ...args),
    );
    return this;
  }

  //Common rules
  contains(input: any, options?: ContainsOptions): this {
    return this.addRule(validations.contains, input, options);
  }
  isEmpty(options?: ValidationOptions): this {
    return this.addRule(validations.isEmpty, options);
  }
  isNotEmpty(options?: ValidationOptions): this {
    return this.addRule(validations.isNotEmpty, options);
  }
  hasLength(input: number, options?: ValidationOptions): this {
    return this.addRule(validations.hasLength, input, options);
  }
  maxLength(input: number, options?: ValidationOptions): this {
    return this.addRule(validations.maxLength, input, options);
  }
  minLength(input: number, options?: ValidationOptions): this {
    return this.addRule(validations.minLength, input, options);
  }

  //String rules
  isAlpha(options?: ValidationOptions): this {
    return this.addRule(validations.isAlpha, options);
  }
  isAlphaNum(options?: ValidationOptions): this {
    return this.addRule(validations.isAlphaNum, options);
  }
  isEmail(options?: ValidationOptions): this {
    return this.addRule(validations.isEmail, options);
  }
  isNumeric(options?: ValidationOptions): this {
    return this.addRule(validations.isNumeric, options);
  }
  isString(options?: ValidationOptions): this {
    return this.addRule(validations.isString, options);
  }
  isUUID(options?: IsUUIDOptions): this {
    return this.addRule(validations.isUUID, options);
  }
  matches(input: string, options?: ValidationOptions) : this {
    return this.addRule(validations.matches, input, options);
  }
  matchesRegex(input: RegExp, options?: ValidationOptions) : this {
    return this.addRule(validations.matchesRegex, input, options);
  }
  toString(options?: ValidationOptions): this {
    return this.addRule(validations.toString, options);
  }

  //Number rules
  toNumber(options?: ToNumberOptions) : this {
    return this.addRule(validations.toNumber, options);
  }
}
