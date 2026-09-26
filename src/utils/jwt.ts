import jwt, {
    type SignOptions,
} from "jsonwebtoken";

import  env  from "../config/env.js";

export interface AccessTokenPayload {
    sub: string;
    role: string;
}

export const generateAccessToken = (
    payload: AccessTokenPayload,
): string => {

 const expiresIn = env.jwt.accessExpiresIn as SignOptions["expiresIn"];

    return jwt.sign(
        payload,
        env.jwt.accessSecret,
        expiresIn ? { expiresIn } : {},
    );
};