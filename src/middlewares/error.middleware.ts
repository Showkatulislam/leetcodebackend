import { ErrorRequestHandler } from "express";
import { AppError } from "../errors/app-error.js";
import { success } from "zod";
import env from "../config/env.js";
import { logger } from "../lib/logger.js";

export const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next): void => {
    if (error instanceof AppError) {
        logger.warn(
            {
                errorCode: error.errorCode,
                statusCode: error.statusCode,
                message: error.message,
            },
            "Operational application error",
        );

        res.status(error.statusCode).json({
            success: false,
            message: error.message,
            errorCode: error.errorCode,
        });

        return;
    }

    logger.error(
        {
            error,
        },
        "Unhandled application error",
    );

    res.status(500).json({
        success: false,
        message:
            env.server.nodeEnv === "production"
                ? "Internal server error"
                : error instanceof Error
                  ? error.message
                  : "Internal server error",
    });
};
