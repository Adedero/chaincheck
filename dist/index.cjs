var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Chaincheck: () => Chaincheck
});
module.exports = __toCommonJS(src_exports);

// src/utils/helpers.ts
var getValueType = (value) => {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "function") return "function";
  if (typeof value === "number") return "number";
  if (typeof value === "string") return "string";
  if (typeof value === "undefined") return "undefined";
  if (value instanceof Date) return "date";
  if (typeof value === "object" && Object.prototype.toString.call(value) === "[object Object]")
    return "object";
  return "unknown";
};
var handleTypeMismatch = (value, data, message) => {
  if (!data.expected.includes(data.received)) {
    return { value, isValid: false, ...data, message };
  }
  return null;
};

// src/lib/validate.ts
var validate = (rules, value, originalValue, config) => {
  let finalValue = value;
  let currentType = getValueType(value);
  const errors = [];
  let applied = 0;
  let failed = 0;
  let passed = 0;
  const transformations = [];
  for (const rule of rules) {
    applied++;
    let result = null;
    try {
      result = rule(finalValue, currentType);
      if (result.isValid) {
        finalValue = result.value;
        passed++;
        if (result.transformation) {
          transformations.push(result.transformation);
          currentType = getValueType(result.value);
        }
      }
      if (!result.isValid) {
        failed++;
        const error = {
          rule: result.rule,
          expected: result.expected,
          received: result.received,
          message: ""
        };
        if (!result.expected.includes(result.received)) {
          error.message = result.message ?? result.expected.length > 1 ? `Value must be one of ${result.expected.join(", ")}` : `Value must be ${result.expected[0]}`;
        } else {
          error.message = result.message ?? `Validation failed for rule: ${result.rule}`;
        }
        errors.push(error);
        if (!config.uninterrupted) {
          return {
            value: result.value,
            originalValue,
            isValid: false,
            errors,
            validationCount: {
              applied,
              failed,
              passed
            },
            transformations
          };
        }
      }
    } catch (err) {
      if (config.strict) {
        throw err;
      }
      const error = err;
      errors.push({
        rule: error.rule,
        expected: error.expected ?? ["unknown"],
        received: error.received ?? "unknown",
        message: `Error: ${error.message ?? "Validation failed"}`
      });
    }
  }
  return {
    value,
    originalValue,
    isValid: errors.length === 0,
    errors,
    validationCount: {
      applied,
      failed,
      passed
    },
    transformations
  };
};

// src/lib/ChaincheckError.ts
var ChaincheckError = class extends Error {
  name;
  rule;
  expected;
  received;
  constructor(message, data, name) {
    super(message);
    this.name = name || "ValidationError";
    this.rule = (data == null ? void 0 : data.rule) ?? "unknown";
    this.stack = new Error(message).stack;
    this.expected = data == null ? void 0 : data.expected;
    this.received = data == null ? void 0 : data.received;
  }
};

// src/rules/common/has-length.ts
var hasLength = (value, type, input, options) => {
  const data = {
    rule: "hasLength",
    expected: ["string", "array", "number", "object"],
    received: type
  };
  if (!input || typeof input !== "number") {
    throw new ChaincheckError(
      "Input parameter is missing or invalid. Input should be a number",
      data,
      "InvalidParemeterError"
    );
  }
  let message = options == null ? void 0 : options.message;
  const error = handleTypeMismatch(value, data, message);
  if (error) return error;
  let length = null;
  if (type === "string" || Array.isArray(value)) {
    length = value.length;
  } else if (type === "object" && value !== null) {
    length = Object.keys(value).length;
  } else if (value instanceof Set || value instanceof Map) {
    length = value.size;
  } else if (typeof value === "number") {
    length = value.toString().length;
  }
  if (length === null) return {
    value,
    isValid: false,
    ...data,
    message: message ?? "Value must be a string, number, array, or object"
  };
  const isValid = length === input;
  const defaultMessage = message ?? (isValid ? "" : `Value must have length equal to ${input}`);
  return {
    value,
    isValid,
    ...data,
    message: defaultMessage
  };
};

// src/rules/common/is-not-empty.ts
var isNotEmpty = (value, type, options) => {
  const data = {
    rule: "isNotEmpty",
    expected: ["string", "array", "object"],
    received: type
  };
  let message = options == null ? void 0 : options.message;
  const error = handleTypeMismatch(value, data, message);
  if (error) return error;
  const isValid = type === "string" && value.trim().length > 0 || type === "array" && Array.isArray(value) && value.length > 0 || type === "object" && value !== null && Object.keys(value).length > 0;
  message = message ?? "Value must not be empty";
  return {
    value,
    isValid,
    ...data,
    message: isValid ? "" : message
  };
};

// src/lib/Chaincheck.ts
var Chaincheck = class {
  value;
  originalValue;
  config;
  rules = [];
  constructor(value, config) {
    this.originalValue = value;
    this.value = value;
    const uninterrupted = (config == null ? void 0 : config.uninterrupted) ?? false;
    const strict = (config == null ? void 0 : config.strict) ?? true;
    this.config = { uninterrupted, strict };
  }
  validate() {
    const result = validate(
      this.rules,
      this.value,
      this.originalValue,
      this.config
    );
    return result;
  }
  //Common rules
  hasLength(input, options) {
    this.rules.push(
      (value) => hasLength(value, getValueType(value), input, options)
    );
    return this;
  }
  isNotEmpty(options) {
    this.rules.push(
      (value) => isNotEmpty(value, getValueType(value), options)
    );
    return this;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Chaincheck
});
