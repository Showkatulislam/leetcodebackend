import type { Request, Response } from "express";

import { AppError } from "../../errors/app-error.js";

const success = async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json({
        success: true,
        message: "Async controller works",
    });
};

const failure = async (_req: Request, _res: Response): Promise<void> => {
    throw new AppError("Async operation failed", 400, "ASYNC_TEST_ERROR");
};

export const testController = {
    success,
    failure,
};
