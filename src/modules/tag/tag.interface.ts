export interface ICreateTag {
    name: string;
    slug:string
}

export interface ITagRepository {
    create(data: ICreateTag): Promise<unknown>;
    findByName(name: string): Promise<unknown>;
    findBySlug(slug: string): Promise<unknown>;
}