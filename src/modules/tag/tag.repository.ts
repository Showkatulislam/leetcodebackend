import { Tag } from "../../../generated/prisma/client.js";
import prisma from "../../lib/prisma.js";
import { ICreateTag, ITagRepository, IUpdateTag } from "./tag.interface.js";

export class TagRepository implements ITagRepository {
    async create(data: ICreateTag): Promise<unknown> {
        return await prisma.tag.create({
            data,
        });
    }
    async findByName(name: string): Promise<unknown> {
        return await prisma.tag.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: "insensitive",
                },
            },
        });
    }

    async findById(id: string): Promise<unknown> {
        return await prisma.tag.findUnique({
            where: {
                id,
            },
        });
    }
    async findBySlug(slug: string): Promise<unknown> {
        return await prisma.tag.findUnique({
            where: {
                slug,
            },
        });
    }
    async update(id: string, data: IUpdateTag): Promise<unknown> {
        return await prisma.tag.update({
            where: {
                id,
            },
            data,
        });
    }
    async delete(id: string): Promise<void> {
    await prisma.tag.delete({
        where: {
            id,
        },
    });
}
async findTagByIds(tagIds: string[]): Promise<Tag[]> {
    return await  prisma.tag.findMany({
        where:{
            id:{
                in:tagIds,
            }
        }
    })
}

async findExistingProblemTags(problemId: string, tagIds: string[]): Promise<string[]> {
    const problemTags = await prisma.problemTag.findMany({
        where:{
            problemId,
            tagId:{
                in:tagIds
            }
        },
        select:{
            tagId:true
        }
    })
    return problemTags.map((problemTag)=>problemTag.tagId);
}

async createProblemTag(problemId: string, tagId: string): Promise<void> {
    await prisma.problemTag.create({
        data:{
            problemId,
            tagId
        }
    })
}


 async assignTagsToProblem(problemId: string, tagIds: string[]): Promise<void> {
    await prisma.$transaction(
        tagIds.map((tagId)=>
        prisma.problemTag.create(
            {
                data:{
                    problemId,
                    tagId
                }
            }
        ))
    )
}




}

export const tagRepository = new TagRepository();
