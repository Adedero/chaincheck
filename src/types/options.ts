import { ValidationOptions } from "./types";

export interface ToNumberOptions extends ValidationOptions {
  forced?: boolean;
}

export interface IsUUIDOptions extends ValidationOptions {
  version?: 1 | 2 | 3 | 4 | 5; // Supported UUID versions
}

export interface ContainsOptions extends ValidationOptions {
  check?: "keys" | "values";
  deep?: boolean;
}