import { ErrorRequestHandler } from "express";
import { AppError } from "../errors/app-error.js";
import { success } from "zod";
import env from "../config/env.js";

export const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next): void => {
    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
            errorCode: error.errorCode,
        });
        return;
    }
    console.error(error);

    res.status(500).json({
        success: false,
        message:
            env.server.nodeEnv === "production"
                ? "Internal server Error"
                : error instanceof Error
                  ? error.message
                  : "Internal server error",
    });
};
