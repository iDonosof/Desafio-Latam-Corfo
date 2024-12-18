import readline  from 'node:readline';

async function Ask(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve, reject) => {
        rl.question(question, input => {
            resolve(input);
            rl.close();
        });
    });
}

export default Ask;