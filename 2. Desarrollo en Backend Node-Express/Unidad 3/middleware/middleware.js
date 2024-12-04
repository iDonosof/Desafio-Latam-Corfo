import { VerifyToken, DecodeToken } from "../utils/jwt.js";

function VerifyBearerToken(req, res, next) {
    const token = req.headers["authorization"]?.match(/(?<=Bearer\s)\S*/g)[0];
    
    if (token && VerifyToken(token)) {
        req.user = DecodeToken(token);
        return next();
    }
    return res.sendStatus(401);
}

export default VerifyBearerToken;
