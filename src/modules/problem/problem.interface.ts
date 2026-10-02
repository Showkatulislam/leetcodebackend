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
     page?:number;
     limit?:number;
}
