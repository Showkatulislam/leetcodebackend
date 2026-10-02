import prisma from "../../lib/prisma.js";
import { ICreateTag, ITagRepository } from "./tag.interface.js";

export class TagRepository implements ITagRepository{
    async create(data: ICreateTag): Promise<unknown> {
        return await prisma.tag.create({
            data,
        })
    }
    async findByName(name: string): Promise<unknown> {
        return await prisma.tag.findFirst({
            where:{
                name:{
                    equals:name,
                    mode:"insensitive"
                }
            }
        })
    }

    async findBySlug(slug: string): Promise<unknown> {
        return await prisma.tag.findUnique({
            where:{
                slug
            }
        })
    }
}

export const tagRepository = new TagRepository()