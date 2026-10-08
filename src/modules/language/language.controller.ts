import { Request, Response } from "express";
import { ICreateLanguagePayload, IUpdateLanguagePayload } from "./language.interface.js";
import { languageService } from "./language.service.js";
import { sendResponse } from "../../shared/utils/send-response.js";


export class LanguageController{
    async create(
        req:Request,
        res:Response
    ){
        const data = req.body as ICreateLanguagePayload;

        const language = await languageService.createLanguage(data);

        sendResponse(res,{
            statusCode:201,
            success:true,
            message:"Language created successfully.",
            data:language
        })
    }

    async getAll(
        _req:Request,
        res:Response
    ){
        const language = await languageService.getLanguages();
        sendResponse(res,{
            statusCode:200,
            success:true,
            message:"Language retrieved successfully.",
            data:language
        })
    }


    async getById(
        req:Request,
        res:Response
    ){
        const {id} = req.params;

        const languages = await languageService.getLanguageById(id as string);

        sendResponse(res,{
            statusCode:200,
            success:true,
            message:"Langauge retrieved successfully.",
            data:languages
        })
    }

    async update(
        req:Request,
        res:Response
    ){
        const {id} = req.params;
        const data = req.body as IUpdateLanguagePayload;

        const language = await languageService.updateLanguage(id as string,data);

        sendResponse(res,{
            statusCode:200,
            success:true,
            message:"Language updated successfully.",
            data:language
        })
    }

    async delete(
        req:Request,
        res:Response
    ){
        const {id} = req.params;

        const langauge = await languageService.deleteLanguage(id as string);

        sendResponse(res,{
            statusCode:200,
            success:true,
            message:"Language deactivated successfully.",
            data:langauge
        })
    }
}

export const langaugeController = new LanguageController()