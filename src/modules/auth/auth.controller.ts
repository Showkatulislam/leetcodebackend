import { Request, Response } from "express";

import { authService } from "./auth.service.js";
import { catchAsync } from "../../shared/utils/catch.async.js";
import { sendResponse } from "../../shared/utils/send-response.js";
import { success } from "zod";

export class AuthController {
    register = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const user = await authService.register(req.body);

        sendResponse(res, {
            message: "Register Successfully.",
            statusCode: 200,
            success: true,
            data: user,
        });
    });
    login = catchAsync(async (req, res) => {
        const user = await authService.login(req.body);
        sendResponse(res, {
            message: "login Successfully.",
            statusCode: 200,
            success: true,
            data: user,
        });
    });

    logout = catchAsync(async (req, res) => {
        await authService.logout(req.body);
        sendResponse(res, {
            success: true,
            message: "Logout successfully.",
            statusCode: 200,
            data: null,
        });
    });

    forgotPassword = catchAsync(async (req, res) => {
        await authService.forgotPassword(req.body);
        sendResponse(res, {
            success: true,
            message: "If the email exists, a password reset link has been sent",
            data: null,
            statusCode: 200,
        });
    });

    resetPassword = catchAsync(async (req, res): Promise<void> => {
        await authService.resetPassword(req.body);
        sendResponse(res, {
            success: true,
            message: "Password reset successfully.",
            statusCode: 200,
        });
    });

    verifyEmail=catchAsync(async(req,res):Promise<void>=>{
        await authService.verifyEmail(req.body);
        sendResponse(res,{
                success: true,
        message: "Email verified successfully",
        data: null,
        statusCode:200,
        })
    })
    resendVerification = catchAsync(async(
    req: Request,
    res: Response,
): Promise<void> =>{
    await authService.resendVerification(
        req.body,
    );

    sendResponse(res,{
        statusCode:200,
        success: true,
        message:
            "If the email requires verification, a verification link has been sent",
        data: null,
    });
})
}

export const authController = new AuthController();
