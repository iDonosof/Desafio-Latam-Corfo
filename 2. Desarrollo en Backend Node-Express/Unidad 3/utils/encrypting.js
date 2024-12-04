import bcrypt from "bcrypt";

async function hash(text) {
    return await bcrypt.hash(text, parseInt(process.env.DEFAULT_ENCRYPT_SALT));
}

async function compare(text, hash) {
    return await bcrypt.compare(text, hash);
}

export { hash, compare };
