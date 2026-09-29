import { Prisma } from "../../../generated/prisma/client.js";


export type ProblemWithRelations = Prisma.ProblemGetPayload<{
    include: {
        tags: true;
        languages: true;
    };
}>;

export interface IProblemRepository {
    create(
        data: Prisma.ProblemCreateInput,
    ): Promise<ProblemWithRelations>;

    update(
        id: string,
        data: Prisma.ProblemUpdateInput,
    ): Promise<ProblemWithRelations>;

    delete(id: string): Promise<ProblemWithRelations>;

    findById(id: string): Promise<ProblemWithRelations | null>;

    findBySlug(slug: string): Promise<ProblemWithRelations | null>;

    findAll(): Promise<ProblemWithRelations[]>;
}