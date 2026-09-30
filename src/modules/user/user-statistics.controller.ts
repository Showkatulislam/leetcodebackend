import { Request, Response } from "express";
import { AppError } from "../../errors/app-error.js";

import { userStatisticsService } from "./user-statistics.service.js";
import { catchAsync } from "../../shared/utils/catch.async.js";

export const getUserStatistics = catchAsync(
    async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        const userId = req.user?.id;

        if (!userId) {
            throw new AppError(
                "Authentication required",
                401,
                "UNAUTHORIZED",
            );
        }

        const statistics =
            await userStatisticsService.getUserStatistics(
                userId,
            );

        res.status(200).json({
            success: true,
            message: "User statistics retrieved successfully",
            data: statistics,
        });
    },
);