import type { Request, Response } from "express";
import env from "../../config/env.js";
import { sendResponse } from "../../shared/utils/send-response.js";

const healthCheck = (_req: Request, res: Response): void => {
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Server is healthy",
        data: {
            status: "ok",
        },
    });
};

export const healthController = {
    healthCheck,
};
