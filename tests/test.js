import { Chaincheck } from '../dist/index.js';

const result = new Chaincheck('suraya').minLength(9).validate();

console.log(result);
