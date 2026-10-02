import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";
import { AppError } from "../errors/app-error.js"; // Adjust the import path to match your project
interface ValidationSchemas {
    body?: ZodType;
    params?: ZodType;
    query?: ZodType;
}

export const validate = (schemas: ValidationSchemas) => {
    return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
        try {
            if (schemas.body) {
                req.body = await schemas.body.parseAsync(req.body);
            }

            if (schemas.params) {
                const parsedParams = await schemas.params.parseAsync(req.params);
                req.params = parsedParams as typeof req.params;
            }

            if (schemas.query) {
                const parsedQuery = await schemas.query.parseAsync(req.query);
                req.query = parsedQuery as typeof req.query;
            }

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                // Combine issues into a clean, human-readable string
                // e.g., "password: Password must be at least 8 characters"
                const formattedMessage = error.issues
                    .map((issue) => {
                        const path = issue.path.length ? `${issue.path.join(".")}: ` : "";
                        return `${path}${issue.message}`;
                    })
                    .join("; ");

                // Forward as an operational AppError (HTTP 400 Bad Request)
                return next(new AppError(formattedMessage, 400, "VALIDATION_ERROR"));
            }

            next(error);
        }
    };
};
