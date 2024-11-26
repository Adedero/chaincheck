import { Chaincheck } from '../dist/index.js';

const result = new Chaincheck("mj").isNotEmpty().hasLength(1).validate();

console.log(result);