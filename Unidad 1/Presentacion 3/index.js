import { Suma, Resta, PI } from './math.js';
import Ask from './message.js';


let firstInput = await Ask("Insert a number\n");
let secondInput = await Ask("Insert a second number\n");

let number1 = parseInt(firstInput || "0");
let number2 = parseInt(secondInput || "0");
debugger;
console.log('Suma: ' + Suma(number1, number2));
console.log('Resta: ' + Resta(number1, number2));
console.log('PI: ' + PI);

