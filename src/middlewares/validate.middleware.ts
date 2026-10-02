import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";

import { AppError } from "../errors/app-error.js";

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
                await schemas.params.parseAsync(req.params);
            }

            if (schemas.query) {
                await schemas.query.parseAsync(req.query);
            }

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedMessage = error.issues
                    .map((issue) => {
                        const path = issue.path.length ? `${issue.path.join(".")}: ` : "";

                        return `${path}${issue.message}`;
                    })
                    .join("; ");

                return next(new AppError(formattedMessage, 400, "VALIDATION_ERROR"));
            }

            next(error);
        }
    };
};
