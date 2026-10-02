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
