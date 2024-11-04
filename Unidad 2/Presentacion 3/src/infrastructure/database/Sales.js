import { INITIAL_ID_VALUE } from "./common/Constants.js";
import { ReadFile, WriteFile } from "./utils/FileManager.js";

/**
 * Method to get all the sale from database (json file)
 * @returns A list with all the sales
 */
async function GetAll() {
    const data = await ReadFile();
    return data.sales;
}

/**
 * Add a new sale to the list of sales and store it into the json file
 * @param {Object} sale 
 * @returns Return the sale created with the id stored
 */
async function Add(sale) {
    const data = await ReadFile();
    //Obtein the last id stored
    const maxId = data.reduce((prev, curr) => (curr.id > prev.id ? curr.id : prev.id), INITIAL_ID_VALUE);
    sale.id = maxId + 1;
    //Add the sale to the list stored in ram
    data.sales.push(sale);
    //Override the json file with the new information
    const err = await WriteFile(data);
    if (err) throw new Error("Failed to create the sale");
    return sale;
}

//TODO: Create GetById, Update and Delete functions

export { GetAll, Add };
