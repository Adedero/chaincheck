import { Chaincheck } from '../dist/index.js';

const result = new Chaincheck(67, { strict: false }).isNotEmpty().validate();

console.log(result);
