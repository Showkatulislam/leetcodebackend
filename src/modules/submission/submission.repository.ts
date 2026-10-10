import { Submission } from "../../../generated/prisma/client.js";
import prisma from "../../lib/prisma.js";
import { ICreateSubmissionPayload, ISubmissionRepository } from "./submission.interface.js";

export class SubmissionRepository implements ISubmissionRepository{
    async create(data: ICreateSubmissionPayload): Promise<Submission> {
        return prisma.submission.create({
          data:{
            userId:data.userId,
            problemId:data.problemId,
            languageId:data.languageId,
            code:data.code,
            status:"PENDING"
          }  
        })
    }

    async findById(id: string): Promise<Submission | null> {
        return prisma.submission.findUnique({
            where:{
                id
            }
        })
    }
    async findByUserId(userId: string): Promise<Submission[]> {
        return prisma.submission.findMany({
            where:{
                userId
            },
            orderBy:{
                createdAt:"desc"
            }
        })
    }

    async findByProblemId(problemId: string): Promise<Submission[]> {
        return prisma.submission.findMany({
            where:{
                problemId
            },
            orderBy:{
                createdAt:"desc"
            }
        })
    }
}

export const submissionRepository = new SubmissionRepository()