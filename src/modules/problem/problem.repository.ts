

import { Problem } from "../../../generated/prisma/client.js";
import prisma from "../../lib/prisma.js";
import type {
    ICreateProblemData,
    IProblemRepository,
    IUpdateProblemData,
} from "./problem.interface.js";

class ProblemRepository implements IProblemRepository {
    async createProblem(
        data: ICreateProblemData,
    ): Promise<Problem> {
        return prisma.problem.create({
            data,
        });
    }

    async updateProblem(
        id: string,
        data: IUpdateProblemData,
    ): Promise<Problem> {
        return prisma.problem.update({
            where: {
                id,
            },
            data,
        });
    }

    async deleteProblem(
        id: string,
    ): Promise<Problem> {
        return prisma.problem.delete({
            where: {
                id,
            },
        });
    }

    async getProblemById(
        id: string,
    ): Promise<Problem | null> {
        return prisma.problem.findUnique({
            where: {
                id,
            },
        });
    }

    async getProblemBySlug(
        slug: string,
    ): Promise<Problem | null> {
        return prisma.problem.findUnique({
            where: {
                slug,
            },
        });
    }

    async getProblems(): Promise<Problem[]> {
        return prisma.problem.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
}

export const problemRepository =
    new ProblemRepository();