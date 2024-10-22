import { Ask, Message } from "./Utils/console.js";
import { CelsiusToFahrenheit, CelsiusToKelvin } from "./Utils/weather.js";

try {
    let celsius = parseInt(await Ask("Ingresar grados centigrados: \n"));

    Message(`Celsius a Fahrenheit: ${CelsiusToFahrenheit(celsius)}`);
    Message(`Celsius a Kelvin: ${CelsiusToKelvin(celsius)}`);
}
catch(e) {
    Message(e, "error");
}