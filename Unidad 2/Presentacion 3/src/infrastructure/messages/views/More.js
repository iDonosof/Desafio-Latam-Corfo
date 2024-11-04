import PressToContinue from "../utils/PressToContinue.js";
import Select from "../components/Select.js";
import Lang from "../common/Lang.js";

import { GetBestProducts, GetSalesByCategory, GetInventoryReport } from "../../../domain/usecase/ProductsUseCase.js";
import { GetClientsVip } from "../../../domain/usecase/ClientsUseCase.js";

export default async function More() {
    const paths = [GetBestProducts, GetSalesByCategory, GetInventoryReport, GetClientsVip];
    const { TOP_PRODUCTS_SOLD, SALES_BY_CATEGORY, INVENTORY_REPORT, VIP_CLIENTS, BACK } = Lang;
    const options = [TOP_PRODUCTS_SOLD, SALES_BY_CATEGORY, INVENTORY_REPORT, VIP_CLIENTS, BACK];
    let option = await Select({ options });

    //Back previous menu
    if (option === 5) return;

    console.log(`*****\t\t\t\t${options[option - 1]}\t\t\t\t*****`);
    console.table(await paths[option - 1]());

    await PressToContinue();
    console.clear();
}
