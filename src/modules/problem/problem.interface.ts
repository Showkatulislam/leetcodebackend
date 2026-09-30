import { Problem } from "../../../generated/prisma/client.js";
import { Difficulty } from "../../../generated/prisma/enums.js";

export interface ICreateProblemData {
    title: string;
    slug: string;
    description: string;
    difficulty: Difficulty;
    isPublished?: boolean;
    timeLimit: number;
    memoryLimit: number;
}

export interface IUpdateProblemData {
    title?: string;
    slug?: string;
    description?: string;
    difficulty?: Difficulty;
    isPublished?: boolean;
    timeLimit?: number;
    memoryLimit?: number;
}

export interface IProblemRepository {
    createProblem(
        data: ICreateProblemData,
    ): Promise<Problem>;

    updateProblem(
        id: string,
        data: IUpdateProblemData,
    ): Promise<Problem>;

    deleteProblem(
        id: string,
    ): Promise<Problem>;

    getProblemById(
        id: string,
    ): Promise<Problem | null>;

    getProblemBySlug(
        slug: string,
    ): Promise<Problem | null>;

    getProblems(): Promise<Problem[]>;
}