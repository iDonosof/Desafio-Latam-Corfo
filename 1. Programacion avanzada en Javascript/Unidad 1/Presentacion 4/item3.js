import { Ask, Message } from "./Utils/console.js";
import GetFullDate from "./Utils/date.js";

try {
    let days = parseInt(await Ask("Ingresar cantidad de dias: \n"));

    Message(GetFullDate(days));
}
catch(e) {
    Message(e, "error");
}