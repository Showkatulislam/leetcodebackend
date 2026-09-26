import { Request, Response } from "express";

import { authService } from "./auth.service.js";
import { catchAsync } from "../../shared/utils/catch.async.js";
import { sendResponse } from "../../shared/utils/send-response.js";

export class AuthController {
    register = catchAsync(async (req: Request, res: Response): Promise<void> => {
        const user = await authService.register(req.body);

        sendResponse(res,{
            message:"Register Successfully.",
            statusCode:200,
            success:true,
            data:user
        })
    });
    login = catchAsync(async (req, res) => {
        const user = await authService.login(req.body);
        sendResponse(res,{
            message:"login Successfully.",
            statusCode:200,
            success:true,
            data:user
        })
    });
}

export const authController = new AuthController();
