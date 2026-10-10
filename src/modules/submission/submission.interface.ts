import { Submission } from "../../../generated/prisma/client.js";

export interface ICreateSubmissionPayload{
    userId:string;
    problemId:string;
    languageId:string;
    code:string;
}

export interface ISubmissionRepository{
    create(
        data:ICreateSubmissionPayload
    ):Promise<Submission>;

    findById(id:string):Promise<Submission | null>;

    findByUserId(userId:string):Promise<Submission[]>

    findByProblemId(problemId:string):Promise<Submission[]>;
}