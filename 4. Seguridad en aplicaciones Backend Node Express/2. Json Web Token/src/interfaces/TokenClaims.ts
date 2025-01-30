import * as jwt from 'jsonwebtoken';

export default interface TokenClaims extends jwt.JwtPayload {
    resource_id: string;
}