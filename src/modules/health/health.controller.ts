import type { Request, Response } from "express";

const healthCheck = (_req: Request, res: Response): void => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
    });
};

export const healthController = {
    healthCheck,
};
