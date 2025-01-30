import { Response, NextFunction, Request } from "express";
import { validate_token } from "../utils/jwt";
import { Client } from "../models";
import ExtendedRequest from "../interfaces/ExtendedRequest";

const private_routes = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { authorization } = _req.headers;
    const token: string = authorization?.split(" ")[1] || "";

    const token_claims: string | null = validate_token(token);

    if (!token || !token_claims) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const user = await Client.findOne({ where: { resource_id: token_claims } });
    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    (_req as ExtendedRequest).user = user;

    next();
};

export default private_routes;
