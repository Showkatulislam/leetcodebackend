import { Problem } from "../../../generated/prisma/client.js";
import { Difficulty } from "../../../generated/prisma/enums.js";

export interface CreateProblemInput {
    title: string;
    slug: string;
    description: string;
    difficulty: Difficulty;
    timeLimit: number;
    memoryLimit: number;
}

export interface UpdateProblemInput {
    title?: string;
    slug?: string;
    description?: string;
    difficulty?: Difficulty;
    timeLimit?: number;
    memoryLimit?: number;
    isPublished?: boolean;
}

export interface ProblemListQuery {
    search?: string;
    difficulty?: "EASY" | "MEDIUM" | "HARD";
    page?: number;
    limit?: number;
    tag?: string;
}

export interface ProblemListResult {
    problems: Problem[];
    total: number;
}

export interface IProblemFilters {
    search?: string;
    difficulty?: Difficulty;
    tag?: string;
    page?: number;
    limit?: number;
}
