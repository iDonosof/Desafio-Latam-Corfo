// Import the library readline from node
import readline  from 'node:readline';

/**
 * Method to ask a value from console. This return a Promise to wait for the response
 * @param {string} question 
 * @returns {Promise}
 */
async function Ask(question) {
    // Setting up to read the console
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    // Return a Promise
    return new Promise((resolve, reject) => {
        // Put a message a wait for the response
        rl.question(question, input => {
            // return the value of the promise
            resolve(input);
            // Stop reading the console
            rl.close();
        });
    });
}

/**
 * Shows a message by console. This can be different type of message ["log", "error", "warn", "debug", "info", "table"]. Uses log as default
 * @param {string} message 
 * @param {string} type 
 */
function Message(message, type = "log") {
    // Allowed type of logs
    let allowedMessage = ["log", "error", "warn", "debug", "info", "table"];
    // Validate the incomming type
    if(!allowedMessage.includes(type)) 
        throw new Error("Invalid type");
    //Show message
    console[type](message);
}

// Export functions as module
export {
    Ask,
    Message
};