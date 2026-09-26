import type { Response } from "express";

interface SendResponseOptions<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data?: T;
    meta?: Record<string, unknown>;
}

export const sendResponse = <T>(res: Response, options: SendResponseOptions<T>): Response => {
    const { statusCode, success, message, data, meta } = options;

    const response: {
        success: boolean;
        message: string;
        data?: T;
        meta?: Record<string, unknown>;
    } = {
        success,
        message,
    };

    if (data !== undefined) {
        response.data = data;
    }

    if (meta !== undefined) {
        response.meta = meta;
    }

    return res.status(statusCode).json(response);
};
