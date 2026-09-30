import { Request, Response } from "express";
import { problemService } from "./problem.service.js";
import { sendResponse } from "../../shared/utils/send-response.js";


export class ProblemController {
    async create(
        req: Request,
        res: Response,
    ): Promise<void> {
        const problem = await problemService.createProblem(req.body);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Problem created successfully",
            data: problem,
        });
    }
}

export const problemController = new ProblemController();