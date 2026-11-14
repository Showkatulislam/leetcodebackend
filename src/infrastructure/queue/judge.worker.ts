import { Worker } from "bullmq"
import { IJudgeJobData } from "./judge.job.interface.js"
import { JUDGE_JOB_NAME, JUDGE_WORKER_OPTIONS } from "./judge.queue.constants.js"
import { redisConnection } from "../redis/redis.connection.js"


interface IJudgeJobProcessor{
    processSubmission(submissionId:string):Promise<void>
}

export const createJudgeWorker=(
    processor:IJudgeJobProcessor
):Worker<IJudgeJobData>=>{
    const worker = new Worker<IJudgeJobData>(
        JUDGE_JOB_NAME,
        async (job):Promise<void>=>{
            if(job.name!==JUDGE_JOB_NAME){
                throw new Error(`Unsuported judge job :${job.name}`)
            }
            const {submissionId} = job.data;
            await processor.processSubmission(submissionId)
        },
        {
            connection:redisConnection,
            concurrency:JUDGE_WORKER_OPTIONS.concurrency
        }
    )
    worker.on("completed",(job):void=>{
        console.info(`Judge job completed: ${job.id}`)
    })

    worker.on("failed",(job,error):void=>{
        console.error( `Judge job failed:${job?.id}??"unknown"`,error.message)
    })
        worker.on("error", (error: Error): void => {
        console.error("Judge worker error:", error.message);
    });

    return worker;

}