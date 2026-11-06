import { Submission } from "../../../generated/prisma/client.js";
import { AppError } from "../../errors/app-error.js";
import { languageConfigurationRepository } from "../configuration/configuration.repository.js";
import { languageRepository } from "../language/language.repository.js";
import { problemRepository } from "../problem/problem.respository.js";
import { ICreateSubmissionPayload } from "./submission.interface.js";
import { submissionRepository } from "./submission.repository.js";

export class SubmissionService{
    async createSubmission(
        data:ICreateSubmissionPayload
    ):Promise<Submission>{
        const problem = await problemRepository.findById(data.problemId);

        if(!problem){
            throw new AppError("Problem not found.",404,"")
        }

        const language = await languageRepository.findById(data.languageId);

        if(!language || !language.isActive){
            throw new AppError("Language not found and inactive",404,"")
        }

        const configuration = await languageConfigurationRepository.findByLanguageId(data.languageId);

        if(!configuration || !configuration.isActive){
            throw new AppError("Language execution configuration is unavailable.",404,"")
        }

        const problemLanguages = await languageRepository.findProblemLanguages(data.problemId);

        const isLanguageSupported = problemLanguages.some(
            (problemLanguage)=>problemLanguage.languageId === data.languageId
        )

        if(!isLanguageSupported){
            throw new AppError("This Language is not enabled for the selected problem.",401,"")
        }
        return submissionRepository.create(data)
    }
}

export const submissionService = new SubmissionService()