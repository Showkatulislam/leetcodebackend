import { LanguageConfiguration } from "../../../generated/prisma/client.js";
import prisma from "../../lib/prisma.js";
import {
    ICreateLanguageConfigurationPayload,
    ILanguageConfigurationRepository,
    IUpdateLanguageConfigurationPayload,
} from "./configuration.interface.js";

export class LanguageConfigurationRepository implements ILanguageConfigurationRepository {
    async create(data: ICreateLanguageConfigurationPayload): Promise<LanguageConfiguration> {
        return prisma.languageConfiguration.create({
            data,
        });
    }
    async findById(id: string): Promise<LanguageConfiguration | null> {
        return prisma.languageConfiguration.findUnique({
            where: {
                id,
            },
        });
    }
    async findByLanguageId(languageId: string): Promise<LanguageConfiguration | null> {
        return prisma.languageConfiguration.findUnique({
            where: {
                languageId,
            },
        });
    }
    async update(
        id: string,
        data: IUpdateLanguageConfigurationPayload,
    ): Promise<LanguageConfiguration> {
        return prisma.languageConfiguration.update({
            where: {
                id,
            },
            data,
        });
    }
}

export const languageConfigurationRepository = new LanguageConfigurationRepository();
