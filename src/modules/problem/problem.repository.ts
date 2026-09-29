import { ProblemCreateInput, ProblemUpdateInput } from "../../../generated/prisma/models.js";
import prisma from "../../lib/prisma.js";
import { IProblemRepository, ProblemWithRelations } from "./problem.interface.js";


export class ProblemRepository implements IProblemRepository{
    async create(data: ProblemCreateInput): Promise<ProblemWithRelations> {
        return prisma.problem.create({
            data,
            include:{
                tags:true,
                languages:true
            }
        })
    }
    async update(id: string, data: ProblemUpdateInput): Promise<ProblemWithRelations> {
        return prisma.problem.update({
            where:{
                id
            },
            data,
            include:{
                tags:true,
                languages:true
            }
        })
    }

    async delete(id: string): Promise<ProblemWithRelations> {
        return prisma.problem.delete({
            where:{
                id
            },
            include:{
                tags:true,
                languages:true
            }
        })
    }

    async findById(id: string): Promise<ProblemWithRelations | null> {
        return prisma.problem.findUnique({
            where:{
                id
            },
            include:{
                tags:true,
                languages:true
            }
        })
    }
    async findBySlug(slug: string): Promise<ProblemWithRelations | null> {
        return prisma.problem.findUnique({
            where:{
                slug
            },
            include:{
                tags:true,
                languages:true
            }
        })
    }

    async findAll(): Promise<ProblemWithRelations[]> {
        return prisma.problem.findMany({
            include:{
                tags:true,
                languages:true
            },
            orderBy:{
                createdAt:"desc"
            }
        })
    }

}