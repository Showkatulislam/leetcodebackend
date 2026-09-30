import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../config/env.js";

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        throw new AppError("Authentication is required", 401, "");
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
        throw new AppError("Invalid authorization header", 401, "");
    }

    const payload = jwt.verify(token, env.jwt.accessSecret) as JwtPayload;

    if (!payload.sub) {
        throw new AppError("Invalid access token", 401, "");
    }

    req.user = {
        id: payload.sub,
        role: payload.role,
    };
    next();
};
