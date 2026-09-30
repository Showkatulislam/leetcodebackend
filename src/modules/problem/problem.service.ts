import { AppError } from "../../errors/app-error.js";
import { problemRepository } from "./problem.repository.js";
import { CreateProblemInput } from "./problem.schema.js";
class ProblemService{
    async createProblem(
        data:CreateProblemInput
    ){
        const existingProblem = await problemRepository.findBySlug(data.slug);

        if(existingProblem){
            throw new AppError("A Problem with this slug already exists",409,"")
        }

        const problem = await problemRepository.create({
            title:data.title,
            slug:data.slug,
            description:data.description,
            difficulty:data.difficulty,
            timeLimit:data.timeLimit,
            memoryLimit:data.memoryLimit,
            isPublished:data.isPublished??false
        })
        return problem
    }
}

export const problemService = new ProblemService()