import { ValidateIntegerNumber } from "../Validations/mathValidations.js";
import { KELVIN_VALUE, FAHRENHEIT_VALUE } from "../Constants/weather.js";

function CelsiusToFahrenheit(celsius) {
    ValidateIntegerNumber([celsius]);
    return (celsius * (9 / 5)) + FAHRENHEIT_VALUE;
}

function CelsiusToKelvin(celsius) {
    ValidateIntegerNumber([celsius]);
    return celsius + KELVIN_VALUE;
}

export {
    CelsiusToFahrenheit,
    CelsiusToKelvin
}