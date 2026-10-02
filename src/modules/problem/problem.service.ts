import { AppError } from "../../errors/app-error.js";
import { CreateProblemInput, ProblemListQuery, UpdateProblemInput } from "./problem.interface.js";
import { problemRepository } from "./problem.respository.js";

class ProblemService {
    public async createProblem(data: CreateProblemInput) {
        const existingProblem = await problemRepository.findBySlug(data.slug);

        if (existingProblem) {
            throw new AppError(
                "A problem with this slug already exists",
                409,
                "PROBLEM_SLUG_EXISTS",
            );
        }

        return problemRepository.create(data);
    }
    public async getProblemById(id: string) {
        const problem = await problemRepository.findPublishedById(id)
        if (!problem) {
            throw new AppError("Problem not found", 404, "PROBLEM_NOT_FOUND");
        }

        return problem;
    }

    public async updateProblem(id: string, data: UpdateProblemInput) {
        const existingProblem = await problemRepository.findById(id);

        if (!existingProblem) {
            throw new AppError("Problem not found", 404, "PROBLEM_NOT_FOUND");
        }

        if (data.slug && data.slug !== existingProblem.slug) {
            const problemWithSlug = await problemRepository.findBySlug(data.slug);

            if (problemWithSlug) {
                throw new AppError(
                    "A problem with this slug already exists",
                    409,
                    "PROBLEM_SLUG_EXISTS",
                );
            }
        }

        return problemRepository.update(id, data);
    }

    public async deleteProblem(id: string) {
        const existingProblem = await problemRepository.findById(id);

        if (!existingProblem) {
            throw new AppError("Problem not found", 404, "PROBLEM_NOT_FOUND");
        }

        return problemRepository.delete(id);
    }

    public async getPublishedProblems(
        query?:ProblemListQuery
    ) {
        return problemRepository.findPublished(query)
    }

    public async countProblems() {
        return problemRepository.countPublished();
    }
}

export const problemService = new ProblemService();
