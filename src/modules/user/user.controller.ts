import { Request, Response } from "express";
import { userService } from "./user.service.js";
import { catchAsync } from "../../shared/utils/catch.async.js";
import { sendResponse } from "../../shared/utils/send-response.js";
import { AppError } from "../../errors/app-error.js";

export const getPublicProfile = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const { username } = req.params;

    const user = await userService.getPublicProfile(username as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        data: user,
        message: "Data load successfully.",
    });
});

export const getCurrentUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError("Authentication required", 401, "UNAUTHORIZED");
    }

    const user = await userService.getCurrentUser(userId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        data: user,
        message: "Current user retrieved successfully",
    });
});

export const updateProfile = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError("Authentication required", 401, "UNAUTHORIZED");
    }

    const user = await userService.updateProfile(userId, req.body);

    sendResponse(res, {
        success: true,
        message: "Profile updated successfully",
        data: user,
        statusCode: 200,
    });
});

export const updateUserRole = catchAsync(
    async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        const { userId } = req.params;

        const user = await userService.updateUserRole(
            userId as string,
            req.body.role,
        );

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User role updated successfully",
            data: user,
        });
    },
);