import { Tag } from "../../../generated/prisma/client.js";

export interface ICreateTag {
    name: string;
    slug: string;
}
export interface IUpdateTag {
    name: string;
    slug: string;
}

export interface IAssignTags {
    problemId: string;
    tagIds: string[];
}

export interface ITagRepository {
    create(data: ICreateTag): Promise<unknown>;
    findByName(name: string): Promise<unknown>;
    findById(id: string): Promise<unknown>;
    findBySlug(slug: string): Promise<unknown>;
    update(id: string, data: IUpdateTag): Promise<unknown>;
    delete(id: string): Promise<void>;

    findTagByIds(tagIds:string[]):Promise<Tag[]>;
    createProblemTag(
        problemId:string,
        tagId:string
    ):Promise<void>;
    findExistingProblemTags(
        problemId:string,
        tagIds:string[]
    ):Promise<string[]>

    assignTagsToProblem(
        problemId:string,
        tagIds:string[]
    ):Promise<void>;
}


