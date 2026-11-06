import { Prisma, Problem } from "../../../generated/prisma/client.js";
import prisma from "../../lib/prisma.js";
import type {
    CreateProblemInput,
    IProblemFilters,
    ProblemListQuery,
    UpdateProblemInput,
} from "./problem.interface.js";
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

    public async findPublished(query?: ProblemListQuery): Promise<Problem[]> {
        const page = query?.page ?? 1;
        const limit = Number(query?.limit || 20);
        const skip = (page - 1) * limit;
        return prisma.problem.findMany({
            where: {
                isPublished: true,
                ...(query?.difficulty
                    ? {
                          difficulty: query.difficulty,
                      }
                    : {}),
                ...(query?.search
                    ? {
                          OR: [
                              {
                                  title: {
                                      contains: query.search,
                                      mode: "insensitive",
                                  },
                                  slug: {
                                      contains: query.search,
                                      mode: "insensitive",
                                  },
                                  description: {
                                      contains: query.search,
                                      mode: "insensitive",
                                  },
                              },
                          ],
                      }
                    : {}),
            },
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limit,
        });
    }

    public async countPublished(query?: ProblemListQuery): Promise<number> {
        return prisma.problem.count({
            where: {
                isPublished: true,
                ...(query?.difficulty
                    ? {
                          difficulty: query.difficulty,
                      }
                    : {}),

                ...(query?.search
                    ? {
                          OR: [
                              {
                                  title: {
                                      contains: query.search,
                                      mode: "insensitive",
                                  },
                              },
                              {
                                  slug: {
                                      contains: query.search,
                                      mode: "insensitive",
                                  },
                              },
                              {
                                  description: {
                                      contains: query.search,
                                      mode: "insensitive",
                                  },
                              },
                          ],
                      }
                    : {}),
            },
        });
    }

    async getAllProblems(filters: IProblemFilters): Promise<Problem[]> {
        const page = filters?.page ?? 1;
        const limit = Number(filters?.limit || 20);
        const skip = (page - 1) * limit;
        const where: Prisma.ProblemWhereInput = {
            isPublished: true,
        };
        if (filters.search) {
            where.OR = [
                {
                    title: {
                        contains: filters.search,
                        mode: "insensitive",
                    },
                },
                {
                    description: {
                        contains: filters.search,
                        mode: "insensitive",
                    },
                },
            ];
        }
        if (filters.difficulty) {
            where.difficulty = filters.difficulty;
        }
        if (filters.tag) {
            where.tags = {
                some: {
                    tag: {
                        slug: filters.tag,
                    },
                },
            };
        }

        const problems = await prisma.problem.findMany({
            where,
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limit,
        });
        return problems;
    }
}

export const problemRepository = new ProblemRepository();
