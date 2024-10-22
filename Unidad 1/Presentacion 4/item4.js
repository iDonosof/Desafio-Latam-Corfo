import { Ask, Message } from "./Utils/console.js";

try {
    let numbers = [];
    for (let i = 0; i < 5; i++) {
        numbers.push(parseInt(await Ask(`Ingresar un numero (${i + 1} / 5): \n`)));
    }
    const sum = numbers.reduce((prev, curr) => prev + curr, 0);
    Message(`La suma de todos los numeros es: ${sum}`);
    Message(`El promedio es: ${sum / numbers.length}`);
}
catch(e) {
    Message(e, "error");
}