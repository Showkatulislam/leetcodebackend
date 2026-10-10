import { Language, ProblemLanguage } from "../../../generated/prisma/client.js";
import { AppError } from "../../errors/app-error.js";
import { problemRepository } from "../problem/problem.respository.js";
import { ICreateLanguagePayload, IUpdateLanguagePayload } from "./language.interface.js";
import { languageRepository } from "./language.repository.js";

export class LanguageService {
    async createLanguage(data: ICreateLanguagePayload): Promise<Language> {
        const existingLanguage = await languageRepository.findByNameAndVersion(
            data.name,
            data.version,
        );

        if (existingLanguage) {
            throw new Error("Language with this name and version already exists");
        }

        const existingSlug = await languageRepository.findBySlug(data.slug);

        if (existingSlug) {
            throw new Error("Language with this slug already exists");
        }

        return languageRepository.create(data);
    }

    async getLanguages(): Promise<Language[]> {
        return languageRepository.findAll();
    }

    async getLanguageById(id: string): Promise<Language> {
        const language = await languageRepository.findById(id);

        if (!language) {
            throw new Error("Language not found");
        }

        return language;
    }

    async updateLanguage(id: string, data: IUpdateLanguagePayload): Promise<Language> {
        const language = await languageRepository.findById(id);

        if (!language) {
            throw new Error("Language not found");
        }

        if (data.slug) {
            const existingSlug = await languageRepository.findBySlug(data.slug);

            if (existingSlug && existingSlug.id !== id) {
                throw new Error("Language with this slug already exists");
            }
        }

        if (data.name || data.version !== undefined) {
            const name = data.name ?? language.name;
            const version =
                data.version !== undefined ? data.version : (language.version ?? undefined);

            const existingLanguage = await languageRepository.findByNameAndVersion(name, version);

            if (existingLanguage && existingLanguage.id !== id) {
                throw new Error("Language with this name and version already exists");
            }
        }

        return languageRepository.update(id, data);
    }

    async deleteLanguage(id: string): Promise<Language> {
        const language = await languageRepository.findById(id);

        if (!language) {
            throw new Error("Language not found");
        }

        return languageRepository.update(id, {
            isActive: false,
        });
    }
    async getSupportLanguages():Promise<Language[]>{
        return languageRepository.findActiveLanguages()
    }
    async getProblemLanguage(
        problemId:string
    ):Promise<ProblemLanguage[]>{
        const problem = await problemRepository.findById(problemId)
        if(!problem){
            throw new AppError("Problem not found",404,"")
        }
        return languageRepository.findProblemLanguages(problemId)
    }
}

export const languageService = new LanguageService();
