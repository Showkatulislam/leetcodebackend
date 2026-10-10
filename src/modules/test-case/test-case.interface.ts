import { CreateTestCaseInput, ITestCaseResponse } from "./test-case.types.js";

export interface ITestCaseRepository {
    create(data: CreateTestCaseInput): Promise<ITestCaseResponse>;

    findById(id: string): Promise<ITestCaseResponse | null>;

    findByProblemId(problemId: string): Promise<ITestCaseResponse[]>;

    findPublicByProblemId(problemId: string): Promise<ITestCaseResponse[]>;

    update(
        id: string,
        data: {
            input?: string;
            expected?: string;
            isPublic?: boolean;
        },
    ): Promise<ITestCaseResponse>;

    delete(id: string): Promise<ITestCaseResponse>;
}
