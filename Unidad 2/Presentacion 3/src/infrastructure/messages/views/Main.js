import Select from "../components/Select.js";

import List from "./List.js";
import Add from "./Add.js";
import More from "./More.js";

import Lang from "../common/Lang.js";

export default async function Main() {
    const paths = [List, Add, More];
    const { SEE_INFORMATION, ADD_RECORD, MORE_OPTION, EXIT } = Lang;
    const options = [SEE_INFORMATION, ADD_RECORD, MORE_OPTION, EXIT];

    let option = 0;
    while (options[option - 1] !== EXIT) {
        option = await Select({ options: options });

        if (option !== 4) await paths[option - 1]();
    }
}
