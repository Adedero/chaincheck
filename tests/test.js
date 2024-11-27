import { Chaincheck } from '../dist/index.js';

const result = new Chaincheck('ssur').toNumber().maxLength(2).validate();

console.log(result);
