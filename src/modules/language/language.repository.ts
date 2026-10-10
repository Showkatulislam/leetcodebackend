import { Language, ProblemLanguage } from "../../../generated/prisma/client.js";
import prisma from "../../lib/prisma.js";
import {
    ICreateLanguagePayload,
    ILanguageRepository,
    IUpdateLanguagePayload,
} from "./language.interface.js";

export class LanguageRepository implements ILanguageRepository {
    async create(data: ICreateLanguagePayload): Promise<Language> {
        return prisma.language.create({
            data,
        });
    }

    async findAll(): Promise<Language[]> {
        return prisma.language.findMany({
            orderBy: {
                name: "asc",
            },
        });
    }
    async findById(id: string): Promise<Language | null> {
        return prisma.language.findUnique({
            where: {
                id,
            },
        });
    }

    async findActiveLanguages(): Promise<Language[]> {
        return prisma.language.findMany({
            where:{
                isActive:true,
                configuration:{
                    is:{
                        isActive:true
                    }
                }
            },
            orderBy:{
                name:"asc"
            }
        })
    }

    async findProblemLanguages(problemId: string): Promise<ProblemLanguage[]> {
        return prisma.problemLanguage.findMany({
            where:{
                problemId,
                language:{
                    isActive:true,
                    configuration:{
                        is:{
                            isActive:true
                        }
                    }
                }
            }
        })
    }

    async findBySlug(slug: string): Promise<Language | null> {
        return prisma.language.findUnique({
            where: {
                slug,
            },
        });
    }

    async findByNameAndVersion(name: string, version?: string): Promise<Language | null> {
        if (!version) {
            return prisma.language.findFirst({
                where: {
                    name,
                    version: null,
                },
            });
        }

        return prisma.language.findUnique({
            where: {
                name_version: {
                    name,
                    version,
                },
            },
        });
    }

    async update(id: string, data: IUpdateLanguagePayload): Promise<Language> {
        return prisma.language.update({
            where: {
                id,
            },
            data,
        });
    }

    async delete(id: string): Promise<Language> {
        return prisma.language.delete({
            where: {
                id,
            },
        });
    }
}

export const languageRepository = new LanguageRepository();
