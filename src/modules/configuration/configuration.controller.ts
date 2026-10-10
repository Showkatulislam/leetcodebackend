
import  { Request, Response } from "express";
import { languageConfigurationService } from "./configuration.service.js";
import { sendResponse } from "../../shared/utils/send-response.js";

export class LanguageConfigurationController {
    async create(
        req: Request,
        res: Response,
    ){
        const configuration =
            await languageConfigurationService.createConfiguration(
                req.body,
            );

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Language configuration created successfully.",
            data: configuration,
        });
    }

    async getByLanguageId(
        req:  Request,
        res: Response,
    ){
        const configuration =
            await languageConfigurationService.getConfigurationByLanguageId(
                req.params.languageId as string,
            );

       sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Language configuration retrieved successfully.",
            data: configuration,
        });
    }

    async update(
        req:Request,
        res: Response,
    ) {
        const configuration =
            await languageConfigurationService.updateConfiguration(
                req.params.id! as string,
                req.body,
            );

       sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Language configuration updated successfully.",
            data: configuration,
        });
    }
}

export const languageConfigurationController =
    new LanguageConfigurationController();
