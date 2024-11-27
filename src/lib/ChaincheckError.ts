import { ChaincheckErrorType, ValueType } from '../types/types';

export default class ChaincheckError extends Error {
  override name: ChaincheckErrorType;
  readonly info?: {
    rule: string;
    expected?: ValueType[];
    received?: ValueType;
  }

  constructor(
    message: string,
    name?: ChaincheckErrorType,
    info?: { rule: string; expected?: ValueType[]; received?: ValueType },
  ) {
    super(message);
    this.name = name || 'ValidationError';
    this.info = info;
    this.stack = new Error(message).stack;
  }
}
