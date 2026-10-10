import type { Request, Response } from "express";

import { TestCaseService } from "./test-case.service.js";
import { sendResponse } from "../../shared/utils/send-response.js";

export class TestCaseController {
    constructor(private readonly testCaseService: TestCaseService) {}

    create = async (req: Request, res: Response): Promise<Response> => {
        const testCase = await this.testCaseService.createTestCase(req.body);

        return sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Test case created successfully",
            data: testCase,
        });
    };

    getById = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const testCase = await this.testCaseService.getTestCaseById(id as string);

        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Test case retrieved successfully",
            data: testCase,
        });
    };

    getByProblem = async (req: Request, res: Response): Promise<Response> => {
        const { problemId } = req.params;

        const testCases = await this.testCaseService.getTestCasesByProblem(problemId as string);

        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Test cases retrieved successfully",
            data: testCases,
        });
    };

    getPublicByProblem = async (req: Request, res: Response): Promise<Response> => {
        const { problemId } = req.params;

        const testCases = await this.testCaseService.getTestCaseById(problemId as string);

        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Public test cases retrieved successfully",
            data: testCases,
        });
    };

    update = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const testCase = await this.testCaseService.updateTestCase(id as string, req.body);

        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Test case updated successfully",
            data: testCase,
        });
    };

    delete = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        await this.testCaseService.deleteTestCase(id as string);

        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Test case deleted successfully",
        });
    };
}
