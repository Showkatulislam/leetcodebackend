import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

interface ValidationSchemas {
    body?: ZodType;
    params?: ZodType;
    query?: ZodType;
}

export const validate = (schemas: ValidationSchemas) => {
    return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
        if (schemas.body) {
            req.body = await schemas.body.parseAsync(req.body);
        }

        if (schemas.params) {
            // Safe assignment compatible with Express ParamsDictionary
            const parsedParams = await schemas.params.parseAsync(req.params);
            req.params = parsedParams as typeof req.params;
        }

        if (schemas.query) {
            // Safe assignment compatible with Express ParsedQs
            const parsedQuery = await schemas.query.parseAsync(req.query);
            req.query = parsedQuery as typeof req.query;
        }

        next();
    };
};
