import Lang from "../common/Lang.js";
/**
 * Create a break point in the console to wait for an input
 * @returns void
 */
export default async function PressToContinue() {
    return new Promise((resolve) => {
        console.log(`${Lang.PRESS_BUTTON}...`);

        process.stdin.setRawMode(true);
        process.stdin.resume();

        process.stdin.once("data", () => {
            process.stdin.pause();
            resolve();
        });
    });
}
