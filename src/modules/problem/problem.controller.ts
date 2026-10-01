import type {
    Request,
    Response,
} from "express";


import { problemService } from "./problem.service.js";
import { sendResponse } from "../../shared/utils/send-response.js";

class ProblemController {
    async createProblem(
        req: Request,
        res: Response,
    ): Promise<void> {
        const problem =
            await problemService.createProblem(
                req.body,
            );

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Problem created successfully",
            data: problem,
        });
    }

    async updateProblem(
        req: Request,
        res: Response,
    ): Promise<void> {
        const problem =
            await problemService.updateProblem(
                req.params.id as string,
                req.body,
            );

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Problem updated successfully",
            data: problem,
        });
    }

    async deleteProblem(
        req: Request,
        res: Response,
    ): Promise<void> {
        await problemService.deleteProblem(
            req.params.id as string,
        );

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Problem deleted successfully",
        });
    }

    async getProblemById(
        req:Request,
        res:Response
    ):Promise<void>{
        const problem = await problemService.getProblemById(req.params.id as string);

        sendResponse(res,{
            statusCode:200,
            success:true,
            message:"Problem retrieved successfully.",
            data:problem
        })
    }
    async getProblems(
    _req: Request,
    res: Response,
): Promise<void> {
    const problems =
        await problemService.getProblems();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Problems retrieved successfully",
        data: problems,
    });
}
async searchProblems(
    req: Request,
    res: Response,
): Promise<void> {
    const problems =
        await problemService.searchProblems(
            req.query.search as string,
        );

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Problems searched successfully",
        data: problems,
    });
}

async filterProblems(
    req: Request,
    res: Response,
): Promise<void> {
    const problems =
        await problemService.filterProblems(
            req.query.difficulty as
                | "EASY"
                | "MEDIUM"
                | "HARD"
                | undefined,
        );

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Problems filtered successfully",
        data: problems,
    });
}
}

export const problemController =
    new ProblemController();