export const validateStringInputs = (input: { [key: string]: string }): void => {
    const keys: string[] = Object.keys(input);
    keys.forEach((key: string): void => {
        const value: string = input[key];
        if (!value) {
            throw new Error(`Invalid parameter, ${key} can't be null or empty`);
        }
    });
};
