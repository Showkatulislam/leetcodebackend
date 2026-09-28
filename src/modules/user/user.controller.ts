import { Request, Response } from "express";
import { userService } from "./user.service.js";
import { catchAsync } from "../../shared/utils/catch.async.js";
import { sendResponse } from "../../shared/utils/send-response.js";

export const getPublicProfile = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
        const { username } = req.params;

        const user = await userService.getPublicProfile(username as string);

        sendResponse(res,{
            statusCode:200,
            success:true,
            data:user,
            message:"Data load successfully."
        })
    },
);