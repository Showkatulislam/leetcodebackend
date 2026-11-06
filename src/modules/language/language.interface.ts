import { Language, ProblemLanguage } from "../../../generated/prisma/client.js";

import type {
    Prisma,
} from "../../../generated/prisma/client.js";

export type ProblemLanguageWithLanguage =
    Prisma.ProblemLanguageGetPayload<{
        include: {
            language: true;
        };
    }>;

export interface ICreateLanguagePayload {
    name: string;
    slug: string;
    version?: string;
}

export interface IUpdateLanguagePayload {
    name?: string;
    slug?: string;
    version?: string;
    isActive?: boolean;
}

export interface ILanguageRepository {
    create(data: ICreateLanguagePayload): Promise<Language>;
    findAll(): Promise<Language[]>;
    findById(id: string): Promise<Language | null>;
    findActiveLanguages():Promise<Language[]>;
    findProblemLanguages(problemId:string):Promise<ProblemLanguage[]>;

    findBySlug(slug: string): Promise<Language | null>;

    findByNameAndVersion(name: string, version?: string): Promise<Language | null>;

    update(id: string, data: IUpdateLanguagePayload): Promise<Language>;

    delete(id: string): Promise<Language>;
}
