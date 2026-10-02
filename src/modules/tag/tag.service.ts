import { AppError } from "../../errors/app-error.js";
import { ICreateTag } from "./tag.interface.js";
import { tagRepository } from "./tag.repository.js";
import { generateSlug } from "./tag.utils.js";


export class TagService{
    async createTag(data:ICreateTag):Promise<unknown>{
        const normalizedName = data.name.trim();

        const existingTag = await tagRepository.findByName(normalizedName);

        if(existingTag){
            throw new AppError(
                "Tag with this name already exists.",
                409,
                ""
            )
        }

        const slug = generateSlug(normalizedName);
        const existingSlug = await tagRepository.findBySlug(slug);
        if(existingTag){
            throw new AppError(
                "Tag with this slug already exists",
                409,
                ""
            )
        }

        return await tagRepository.create({
            name:normalizedName,
            slug
        })
    }
}

export const tagService = new TagService();