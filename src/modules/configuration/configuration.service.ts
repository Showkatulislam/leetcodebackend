import { LanguageConfiguration } from "../../../generated/prisma/client.js";
import { AppError } from "../../errors/app-error.js";
import {
    ICreateLanguageConfigurationPayload,
    IUpdateLanguageConfigurationPayload,
} from "./configuration.interface.js";
import { languageConfigurationRepository } from "./configuration.repository.js";

export class LanguageConfigurationService {
    async createConfiguration(
        data: ICreateLanguageConfigurationPayload,
    ): Promise<LanguageConfiguration> {
        const language = await languageConfigurationRepository.findById(data.languageId);

        if (!language) {
            throw new AppError("Language not found.", 404, "");
        }

        if (!language.isActive) {
            throw new AppError("Cannot configure an inactive language", 409, "");
        }

        const existingConfiguration = await languageConfigurationRepository.findByLanguageId(
            data.languageId,
        );

        if (existingConfiguration) {
            throw new AppError("Configuration already exists for this language", 409, "");
        }

        this.validateLimits(data.defaultTimeLimit, data.defaultMemoryLimit);

        return languageConfigurationRepository.create(data);
    }

    async getConfigurationByLanguageId(languageId: string): Promise<LanguageConfiguration> {
        const configuration = await languageConfigurationRepository.findByLanguageId(languageId);

        if (!configuration) {
            throw new AppError("Language configuration not found", 404, "");
        }
        return configuration;
    }
    async updateConfiguration(
        id: string,
        data: IUpdateLanguageConfigurationPayload,
    ): Promise<LanguageConfiguration> {
        const existingConfiguration = await languageConfigurationRepository.findById(id);

        if (!existingConfiguration) {
            throw new AppError("Language configuration not found.", 404, "");
        }
        this.validateLimits(data.defaultTimeLimit, data.defaultMemoryLimit);

        return languageConfigurationRepository.update(id, data);
    }

    private validateLimits(timeLimit?: number, memoryLimit?: number): void {
        if (timeLimit !== undefined && timeLimit <= 0) {
            throw new AppError("Default time limit must be greater than zero.", 401, "");
        }

        if (memoryLimit !== undefined && memoryLimit <= 0) {
            throw new AppError("Default memory limit must be greater than zero", 401, "");
        }
    }
}

export const languageConfigurationService = new LanguageConfigurationService();
