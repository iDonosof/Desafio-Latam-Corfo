import { select } from "@inquirer/prompts";
import Lang from "../common/Lang.js";

export default async function Select({ question = Lang.OPTIONS_MENU, options = [] }) {
    let selectedOption = await select({
        message: `${question}:`,
        choices: options.map((option, i) => ({ name: option, value: i + 1 })),
    });
    console.clear();
    return selectedOption;
}
