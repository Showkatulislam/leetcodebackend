import { Request, Response } from "express";
import { tagService } from "./tag.service.js";
import { sendResponse } from "../../shared/utils/send-response.js";

export class TagController {
    async createTag(req: Request, res: Response) {
        const tag = await tagService.createTag(req.body);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Tag created successfully",
            data: tag,
        });
    }

    async updateTag(
        req:Request,
        res:Response
    ){
        const {id} = req.params;

        const tag = await tagService.updateTag(
            id as string,
            req.body
        )

        sendResponse(res,{
            statusCode:200,
            success:true,
            message:"Tag updated successfully.",
            data:tag
        })
    }

    async deleteTag(
        req:Request,
        res:Response
    ){
        const {id} = req.params;

        await tagService.deleteTag(id as string);

        sendResponse(res,{
            statusCode:200,
            success:true,
             message: "Tag deleted successfully",
        })
    }
    async  assignTagsToProblem(
        req:Request,
        res:Response
    ){
        const problemId = req.params.problemId as string;

        await tagService.assignTagsProblem(
            problemId,
            req.body.tagIds
        )

        sendResponse(res,{
            statusCode:200,
            success:true,
            message:"Tags assigned to problem successfully."
        })
    }
}

export const tagController = new TagController();
