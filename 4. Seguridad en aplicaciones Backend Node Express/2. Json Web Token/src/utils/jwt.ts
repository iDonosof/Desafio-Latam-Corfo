import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/enviroment";
import TokenClaims from "../interfaces/TokenClaims";

export const generate_token = (resource_id: string): string => {
    return jwt.sign({ resource_id }, JWT_SECRET, { expiresIn: "1h" });
};

export const validate_token = (token: string): string | null => {
    try {
        const { resource_id }: { resource_id: string } = jwt.verify(token, JWT_SECRET) as TokenClaims;

        return resource_id || null;
    } catch {
        return null;
    }
};
