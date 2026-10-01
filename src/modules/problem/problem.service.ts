import {
    problemRepository,
} from "./problem.repository.js";

import {
    ICreateProblemData,
    IUpdateProblemData,
} from "./problem.interface.js";
import { AppError } from "../../errors/app-error.js";
import { Problem } from "../../../generated/prisma/client.js";

class ProblemService {
    async createProblem(
        data: ICreateProblemData,
    ) {
        const existingProblem =
            await problemRepository.getProblemBySlug(
                data.slug,
            );

        if (existingProblem) {
            throw new AppError(
                "A problem with this slug already exists",
                 409,
                 ""
            );
        }

        return problemRepository.createProblem(data);
    }

    async updateProblem(
        id: string,
        data: IUpdateProblemData,
    ) {
        const existingProblem =
            await problemRepository.getProblemById(id);

        if (!existingProblem) {
            throw new AppError(
                "Problem not found",
                404,
                 ""
            );
        }

        if (data.slug) {
            const problemWithSlug =
                await problemRepository.getProblemBySlug(
                    data.slug,
                );

            if (
                problemWithSlug &&
                problemWithSlug.id !== id
            ) {
                throw new AppError(
                    "A problem with this slug already exists",
                    409,
                 ""
                );
            }
        }

        return problemRepository.updateProblem(
            id,
            data,
        );
    }

    async deleteProblem(
        id: string,
    ) {
        const existingProblem =
            await problemRepository.getProblemById(id);

        if (!existingProblem) {
            throw new AppError(
                "Problem not found",
                                 404,
                 ""
            );
        }

        return problemRepository.deleteProblem(id);
    }

    async getProblemById(
        id: string,
    ) {
        const problem =
            await problemRepository.getProblemById(id);

        if (!problem) {
            throw new AppError(
                "Problem not found",
                 404,
                 ""
            );
        }

        return problem;
    }

    async getProblemBySlug(
        slug: string,
    ) {
        const problem =
            await problemRepository.getProblemBySlug(
                slug,
            );

        if (!problem) {
            throw new AppError(
                "Problem not found",
                404,
                 ""
            );
        }

        return problem;
    }

    async getProblems() {
        return problemRepository.getProblems();
    }

    async searchProblems(
    search: string,
): Promise<Problem[]> {
    return problemRepository.searchProblems(
        search,
    );
}

async filterProblems(
    difficulty?: "EASY" | "MEDIUM" | "HARD",
): Promise<Problem[]> {
    return problemRepository.filterProblems(
        difficulty,
    );
}

}

export const problemService =
    new ProblemService();