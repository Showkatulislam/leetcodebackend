import { AppError } from "../../errors/app-error.js";
import { problemService } from "../problem/problem.service.js";
import { ICreateTag, IUpdateTag } from "./tag.interface.js";
import { tagRepository } from "./tag.repository.js";
import { generateSlug } from "./tag.utils.js";

export class TagService {
    async createTag(data: ICreateTag): Promise<unknown> {
        const normalizedName = data.name.trim();

        const existingTag = await tagRepository.findByName(normalizedName);

        if (existingTag) {
            throw new AppError("Tag with this name already exists.", 409, "");
        }

        const slug = generateSlug(normalizedName);
        const existingSlug = await tagRepository.findBySlug(slug);
        if (existingTag) {
            throw new AppError("Tag with this slug already exists", 409, "");
        }

        return await tagRepository.create({
            name: normalizedName,
            slug,
        });
    }
    async updateTag(id: string, data: IUpdateTag): Promise<unknown> {
        const existingTag = await tagRepository.findById(id);

        if (existingTag) {
            throw new AppError("Tag with this name already exists", 409, "TAG_ALREADY_EXISTS");
        }

        const normalizedName = data.name.trim();
        const existingNameTag = await tagRepository.findByName(normalizedName);

        if (existingNameTag) {
            throw new AppError("Tag with this name already exists", 409, "TAG_ALREADY_EXISTS");
        }

        const slug = generateSlug(normalizedName);

        const existingSlug = await tagRepository.findBySlug(slug);

        if (existingSlug) {
            throw new AppError("Tag with this slug already exists", 409, "TAG_SLUG_ALREADY_EXISTS");
        }

        return await tagRepository.update(id, { name: normalizedName, slug });
    }
    async deleteTag(id:string):Promise<void>{
        const existingTag = await tagRepository.findById(id);

        if(!existingTag){
            throw new AppError(
                "Tag not found",
                404,
                ""
            )
        }
        await tagRepository.delete(id)
    }

    async assignTagsProblem(
        problemId:string,
        tagIds:string[]
    ):Promise<void>{
        const problem = await problemService.getProblemById(problemId);

        if(!problem){
            throw new AppError(
                "Problem not found",
                404,
                ""
            )
        }
        const tags = await tagRepository.findTagByIds(tagIds);

        if(tags.length !== tagIds.length){
            throw new AppError(
                "One or more tags were not found",
                404,
                ""
            )
        }

        const existingTagIds = await tagRepository.findExistingProblemTags(
            problemId,
            tagIds
        )

        const existingTagSet = new Set(existingTagIds);

        const newTagIds = tagIds.filter(
            (tagId)=>!existingTagSet.has(tagId)
        )

        await tagRepository.assignTagsToProblem(
            problemId,
            tagIds
        )
    }

    

}

export const tagService = new TagService();
