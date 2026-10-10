export interface CreateTestCaseInput {
    problemId: string;
    input: string;
    expected: string;
    isPublic?: boolean;
}

export interface UpdateTestCaseInput {
    input?: string;
    expected?: string;
    isPublic?: boolean;
}

export interface ITestCaseResponse {
    id: string;
    problemId: string;
    input: string;
    expected: string;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
}
