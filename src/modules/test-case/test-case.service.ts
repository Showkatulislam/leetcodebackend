import { AppError } from "../../errors/app-error.js";
import { IProblemRepository } from "../problem/problem.repository.interface.js";
import { ITestCaseRepository } from "./test-case.interface.js";
import { CreateTestCaseInput, UpdateTestCaseInput } from "./test-case.types.js";

export class TestCaseService {
    constructor(
        private readonly testCaseRepository: ITestCaseRepository,
        private readonly problemRepository: IProblemRepository,
    ) {}

    async createTestCase(data: CreateTestCaseInput) {
        const problem = await this.problemRepository.findById(data.problemId);
        if (!problem) {
            throw new AppError("Problem is not found.", 404, "");
        }
        return this.testCaseRepository.create(data);
    }

    async getTestCaseById(id: string, includeHidden = false) {
        const testCase = await this.testCaseRepository.findById(id);

        if (!testCase) {
            throw new Error("Test case not found");
        }

        if (!includeHidden && !testCase.isPublic) {
            throw new AppError("Test case not found", 404, "");
        }

        return testCase;
    }

    async getTestCasesByProblem(problemId: string, includeHidden = false) {
        if (includeHidden) return await this.testCaseRepository.findByProblemId(problemId);
        return await this.testCaseRepository.findPublicByProblemId(problemId);
    }

    async updateTestCase(id: string, data: UpdateTestCaseInput) {
        const testCase = await this.testCaseRepository.findById(id);

        if (!testCase) {
            throw new Error("Test case not found");
        }

        return this.testCaseRepository.update(id, data);
    }

    async deleteTestCase(id: string) {
        const testCase = await this.testCaseRepository.findById(id);

        if (!testCase) {
            throw new Error("Test case not found");
        }

        return this.testCaseRepository.delete(id);
    }
}
