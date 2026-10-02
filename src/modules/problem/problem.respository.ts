import { Problem } from "../../../generated/prisma/client.js";
import prisma from "../../lib/prisma.js";
import type { CreateProblemInput, UpdateProblemInput } from "./problem.interface.js";
import type { IProblemRepository } from "./problem.repository.interface.js";

class ProblemRepository implements IProblemRepository {
    public async create(data: CreateProblemInput): Promise<Problem> {
        return prisma.problem.create({
            data,
        });
    }

    public async findById(id: string): Promise<Problem | null> {
        return prisma.problem.findUnique({
            where: {
                id,
            },
        });
    }

    public async findBySlug(slug: string): Promise<Problem | null> {
        return prisma.problem.findUnique({
            where: {
                slug,
            },
        });
    }

    public async update(id: string, data: UpdateProblemInput): Promise<Problem> {
        return prisma.problem.update({
            where: {
                id,
            },
            data,
        });
    }

    public async delete(id: string): Promise<Problem> {
        return prisma.problem.delete({
            where: {
                id,
            },
        });
    }

    public async findAll(): Promise<Problem[]> {
        return prisma.problem.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    public async count(): Promise<number> {
        return prisma.problem.count();
    }
}

export const problemRepository = new ProblemRepository();
