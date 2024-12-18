const bcrypt = require("bcrypt");

async function hash(text) {
    return await bcrypt.hash(text, parseInt(process.env.DEFAULT_ENCRYPT_SALT));
}

async function compare(text, hash) {
    return await bcrypt.compare(text, hash);
}

module.exports = {
    hash,
    compare,
};
