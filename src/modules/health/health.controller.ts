import type { Request, Response } from "express";
import env from "../../config/env.js";

const healthCheck = (_req: Request, res: Response): void => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
        environment: env.server.nodeEnv,
    });
};

export const healthController = {
    healthCheck,
};
