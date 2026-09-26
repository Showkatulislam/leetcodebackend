import { Request, Response } from "express";

import { authService } from "./auth.service.js";
import { catchAsync } from "../../shared/utils/catch.async.js";

export class AuthController {
    register = catchAsync(
        async (req: Request, res: Response): Promise<void> => {
            const user = await authService.register(req.body);

            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: user,
            });
        }
    );
}

export const authController = new AuthController();