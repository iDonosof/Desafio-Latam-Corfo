import { ValidateIntegerNumber, ValidateCeroValues, ValidateNoNegativeNumbers } from '../Validations/mathValidations.js'; 

function Sum (a, b) {
    ValidateIntegerNumber([a, b]);
    ValidateNoNegativeNumbers([a, b]);
    return a + b;
}

function Rest(a, b) {
    ValidateIntegerNumber([a, b]);
    return a - b;
}

function Division (a, b) {
    ValidateIntegerNumber([a, b]);
    ValidateNoNegativeNumbers([a, b]);
    ValidateCeroValues(b);
    return a / b;
}

function Multiplication(a, b) {
    ValidateIntegerNumber([a, b]);
    ValidateNoNegativeNumbers([a, b]);
    return a * b;
}

function Module(a, b) {
    ValidateIntegerNumber([a, b]);
    ValidateNoNegativeNumbers([a, b]);
    return a % b;
}

export {
    Sum,
    Rest,
    Division,
    Multiplication,
    Module
}