import { Problem } from "../../../generated/prisma/client.js";
import prisma from "../../lib/prisma.js";
import type { CreateProblemInput, ProblemListQuery, UpdateProblemInput } from "./problem.interface.js";
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
        public async findPublishedById(id: string): Promise<Problem | null> {
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

public async findPublished(
     query?: ProblemListQuery,
): Promise<Problem[]> {
    return prisma.problem.findMany({
        where: {
            isPublished: true,
            ...(query?.difficulty?{
                difficulty:query.difficulty
            }:{}),
            ...(query?.search?{
                OR:[
                    {
                        title:{
                            contains:query.search,
                            mode:"insensitive"
                        },
                        slug:{
                            contains:query.search,
                            mode:"insensitive",
                        },
                        description:{
                            contains:query.search,
                            mode:"insensitive"
                        }
                    }
                ]
            }:{})
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

public async countPublished(): Promise<number> {
    return prisma.problem.count({
        where: {
            isPublished: true,
        },
    });
}
}

export const problemRepository = new ProblemRepository();
