import { ChaincheckErrorType, ValueType } from '../types/types';

export default class ChaincheckError extends Error {
  override name: ChaincheckErrorType;
  readonly rule: string;
  readonly expected?: ValueType[];
  readonly received?: ValueType;

  constructor(
    message: string,
    data?: { rule: string; expected: ValueType[]; received: ValueType },
    name?: ChaincheckErrorType,
  ) {
    super(message);
    this.name = name || 'ValidationError';
    this.rule = data?.rule ?? 'unknown';
    this.stack = new Error(message).stack;
    this.expected = data?.expected;
    this.received = data?.received;
  }
}
