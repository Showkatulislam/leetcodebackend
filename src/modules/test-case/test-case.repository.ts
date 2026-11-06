import { PrismaClient } from "../../../generated/prisma/client.js";
import { ITestCaseRepository } from "./test-case.interface.js";

import { CreateTestCaseInput, UpdateTestCaseInput } from "./test-case.types.js";

export class TestCaseRepository implements ITestCaseRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async create(data: CreateTestCaseInput) {
        return this.prisma.testCase.create({
            data: {
                problemId: data.problemId,
                input: data.input,
                expected: data.expected,
                isPublic: data.isPublic ?? false,
            },
        });
    }

    async findById(id: string) {
        return this.prisma.testCase.findUnique({
            where: {
                id,
            },
        });
    }

    async findByProblemId(problemId: string) {
        return this.prisma.testCase.findMany({
            where: {
                problemId,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
    }

    async findPublicByProblemId(problemId: string) {
        return this.prisma.testCase.findMany({
            where: {
                problemId,
                isPublic: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
    }

    async update(id: string, data: UpdateTestCaseInput) {
        return this.prisma.testCase.update({
            where: {
                id,
            },
            data,
        });
    }

    async delete(id: string) {
        return this.prisma.testCase.delete({
            where: {
                id,
            },
        });
    }
}
