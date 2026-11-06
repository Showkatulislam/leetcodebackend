import { LanguageConfiguration } from "../../../generated/prisma/client.js";

export interface ICreateLanguageConfigurationPayload {
    languageId: string;
    runtimeImage: string;
    sourceFile: string;
    compileCommand?: string;
    runCommand: string;
    defaultTimeLimit?: number;
    defaultMemoryLimit?: number;
}

export interface IUpdateLanguageConfigurationPayload {
    runtimeImage?: string;
    sourceFile?: string;
    compileCommand?: string | null;
    runCommand?: string;
    defaultTimeLimit?: number;
    defaultMemoryLimit?: number;
    isActive?: boolean;
}
export interface ILanguageConfigurationRepository {
    create(data: ICreateLanguageConfigurationPayload): Promise<LanguageConfiguration>;
    findById(id: string): Promise<LanguageConfiguration | null>;
    findByLanguageId(languageId: string): Promise<LanguageConfiguration | null>;
    update(id: string, data: IUpdateLanguageConfigurationPayload): Promise<LanguageConfiguration>;
}
