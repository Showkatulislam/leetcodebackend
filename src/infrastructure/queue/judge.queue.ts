import { Queue } from "bullmq";
import { IJudgeJobData } from "./judge.job.interface.js";
import { JUDGE_JOB_NAME, JUDGE_JOB_OPTIONS } from "./judge.queue.constants.js";
import { redisConnection } from "../redis/redis.connection.js";




export const judgeQueue = new Queue<IJudgeJobData>(
    JUDGE_JOB_NAME,
    {
        connection:redisConnection,
        defaultJobOptions:JUDGE_JOB_OPTIONS
    }
)

export const addJudgeJob = async(
    data:IJudgeJobData
):Promise<void>=>{
    await judgeQueue.add(JUDGE_JOB_NAME,
        data,
        {
            jobId:`judge - ${data.submissionId}`
        }
    )
}