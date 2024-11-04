import { INITIAL_ID_VALUE } from "./common/Constants.js"
import { ReadFile, WriteFile } from "./utils/FileManager.js";

/**
 * Method to get all the product from database (json file)
 * @returns A list with all the products
 */
async function GetAll() {
    const data = await ReadFile();
    return data.products;
}

/**
 * Add a new product to the list of products and store it into the json file
 * @param {Object} product 
 * @returns Return the product created with the id stored
 */
async function Add(product) {
    const data = await ReadFile();
    //Obtein the last id stored
    const maxId = data.reduce((prev, curr) => (curr.id > prev.id ? curr.id : prev.id), INITIAL_ID_VALUE);
    product.id = maxId + 1;
    //Add the product to the list stored in ram
    data.products.push(product);
    //Override the json file with the new information
    const err = await WriteFile(data);
    if(err) throw new Error("Failed to create the product");
    return product;
}

//TODO: Create GetById, Update and Delete functions

export {
    GetAll,
    Add
}