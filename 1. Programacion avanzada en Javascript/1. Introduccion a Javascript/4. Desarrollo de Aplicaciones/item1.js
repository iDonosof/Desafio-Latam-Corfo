import { Sum, Rest, Division, Multiplication, Module } from './Utils/math.js';
import { Ask, Message } from './Utils/console.js';

try {
    let number1 = parseInt(await Ask("Ingresar 1 numero \n"));
    let number2 = parseInt(await Ask("Ingresar otro numero: \n"));

    if((number1 === 0 || number2 === 0) || (number1 === number2)) {
        throw new Error("Numbers can't be equals to 0 or can't be the same number");
    }

    Message(`Suma: ${Sum(number1, number2)}`);
    Message(`Resta: ${Rest(number1, number2)}`);
    Message(`División: ${Division(number1, number2)}`);
    Message(`Multiplicación: ${Multiplication(number1, number2)}`);
    Message(`Modulo: ${Module(number1, number2)}`);
}
catch(e) {
    Message(e, "error");
}