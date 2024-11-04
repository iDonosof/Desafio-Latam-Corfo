import { readFile, writeFile } from "fs";
import { DATABASE_FILE_PATH, DEFAULT_DATABASE_OBJECT } from "../common/Constants.js";

/**
 * Return the whole json file as object
 * @returns An object with the whole json data
 */
function ReadFile() {
    return new Promise((resolve, reject) => {
        readFile(DATABASE_FILE_PATH, (err, data) => {
            if (err) {
                return reject(err);
            }
            if (!data) {
                return resolve(DEFAULT_DATABASE_OBJECT);
            }
            resolve(JSON.parse(data));
        });
    });
}

/**
 * Allow to store the new data to override the json file
 * @param {Object} data
 */
function WriteFile(data = DEFAULT_DATABASE_OBJECT) {
    return new Promise((resolve, reject) => {
        writeFile(DATABASE_FILE_PATH, data, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

export { ReadFile, WriteFile };
