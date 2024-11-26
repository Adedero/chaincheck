interface InitializationOptions {
    uninterrupted: boolean;
    strict: boolean;
}
interface ValidationOptions {
    message?: string;
}
type ValueType = 'array' | 'boolean' | 'date' | 'function' | 'null' | 'number' | 'object' | 'string' | 'undefined' | 'unknown';
interface ValidationResult<T> {
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
interface ValidationError {
    rule: string;
    expected: string[];
    received: ValueType;
    message?: string;
}

declare class Chaincheck<T> {
    private value;
    private originalValue;
    private readonly config;
    private rules;
    constructor(value: any, config?: InitializationOptions);
    validate(): ValidationResult<T>;
    hasLength(input: number, options?: ValidationOptions): this;
    isNotEmpty(options?: ValidationOptions): this;
}

export { Chaincheck };
