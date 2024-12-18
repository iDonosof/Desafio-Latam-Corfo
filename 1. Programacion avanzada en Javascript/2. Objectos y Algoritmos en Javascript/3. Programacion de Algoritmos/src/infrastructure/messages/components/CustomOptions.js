import Select from "./Select.js";
import Lang from "../common/Lang.js";

export default async function Main() {
    const { CLIENTS, PRODUCTS, SALES, BACK } = Lang;
    return await Select({ options: [CLIENTS, PRODUCTS, SALES, BACK] });
}
