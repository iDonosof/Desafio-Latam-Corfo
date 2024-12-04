export default async function PressToContinue() {
    return new Promise((resolve) => {
        console.log(`Pulsa cualquier boton para continuar...\n`);

        process.stdin.setRawMode(true);
        process.stdin.resume();

        process.stdin.once("data", () => {
            process.stdin.pause();
            resolve();
        });
    });
}
