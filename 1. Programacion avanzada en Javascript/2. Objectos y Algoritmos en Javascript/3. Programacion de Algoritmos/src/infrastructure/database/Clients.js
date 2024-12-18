import { INITIAL_ID_VALUE } from "./common/Constants.js";
import { ReadFile, WriteFile } from "./utils/FileManager.js";

/**
 * Method to get all the client from database (json file)
 * @returns A list with all the clients
 */
async function GetAll() {
    const data = await ReadFile();
    return data.clients;
}

/**
 * Add a new client to the list of clients and store it into the json file
 * @param {Object} client 
 * @returns Return the client created with the id stored
 */
async function Add(client) {
    const data = await ReadFile();
    //Obtein the last id stored
    const maxId = data.reduce((prev, curr) => (curr.id > prev.id ? curr.id : prev.id), INITIAL_ID_VALUE);
    client.id = maxId + 1;
    //Add the client to the list stored in ram
    data.clients.push(client);
    //Override the json file with the new information
    const err = await WriteFile(data);
    if (err) throw new Error(`Failed to create the client[${err}]`);
    return client;
}

export { GetAll, Add };
