import { NextFunction, Request, Response } from "express";
import { problemService } from "./problem.service.js";
import { sendResponse } from "../../shared/utils/send-response.js";

class ProblemController {
    public async createProblem(
        req: Request,
        res: Response,
        _next: NextFunction,
    ): Promise<void> {
        const problem = await problemService.createProblem(req.body);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Problem created successfully",
            data: problem,
        });
    }

    public async getProblemById(
        req: Request,
        res: Response,
        _next: NextFunction,
    ): Promise<void> {
        const { id } = req.params;

        const problem = await problemService.getProblemById(id as string);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Problem retrieved successfully",
            data: problem,
        });
    }

    public async updateProblem(
        req: Request,
        res: Response,
        _next: NextFunction,
    ): Promise<void> {
        const { id } = req.params;

        const problem = await problemService.updateProblem(
            id as string,
            req.body,
        );

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Problem updated successfully",
            data: problem,
        });
    }

    public async deleteProblem(
        req: Request,
        res: Response,
        _next: NextFunction,
    ): Promise<void> {
        const { id } = req.params;

        await problemService.deleteProblem(id as string);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Problem deleted successfully",
        });
    }

    public async getAllProblems(
        _req: Request,
        res: Response,
        _next: NextFunction,
    ): Promise<void> {
        const problems = await problemService.getAllProblems();

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Problems retrieved successfully",
            data: problems,
        });
    }
}

export const problemController = new ProblemController();