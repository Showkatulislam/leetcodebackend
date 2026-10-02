import { Request, Response } from "express";
import { tagService } from "./tag.service.js";
import { sendResponse } from "../../shared/utils/send-response.js";


export class TagController{
    async createTag(
        req:Request,
        res:Response
    ){
        const tag = await tagService.createTag(req.body);

         sendResponse(
            res,{
                statusCode:201,
                success:true,
                message:"Tag created successfully",
                data:tag
            }
        )
    }
}

export const tagController = new TagController()