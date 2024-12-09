const jwt = require("jsonwebtoken");

function GenerateToken(user) {
    return jwt.sign(user, process.env.SECRET_KEY);
}

function VerifyToken(token) {
    try {
        jwt.verify(token, process.env.SECRET_KEY);
        return true;
    } catch (err) {
        return false;
    }
}

function DecodeToken(token) {
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        throw Error(err);
    }
}

module.exports = {
    GenerateToken,
    VerifyToken,
    DecodeToken,
};
