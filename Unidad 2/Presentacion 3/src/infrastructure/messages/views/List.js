import CustomOptions from "../components/CustomOptions.js";
import { GetAllProducts } from "../../../domain/usecase/ProductsUseCase.js";
import { GetAllClients } from "../../../domain/usecase/ClientsUseCase.js";
import { GetAllSales } from "../../../domain/usecase/SalesUseCase.js";
import PressToContinue from "../utils/PressToContinue.js";

export default async function Main() {
    const paths = [GetAllClients, GetAllProducts, GetAllSales];
    let option = await CustomOptions();
    //Back previous menu
    if (option === 4) return;
    console.table(await paths[option - 1]());
    await PressToContinue();
    console.clear();
}
