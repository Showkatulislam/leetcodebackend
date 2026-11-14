
export const JUDGE_QUEUE_NAME = "judge-queue"
export const JUDGE_JOB_NAME = "judge-submission";
export const JUDGE_WORKER_OPTIONS = {
    concurrency: 2,
};

export const JUDGE_JOB_OPTIONS = {
    attempts:3,
    backoff:{
        type:"exponential" as const,
        delay:2000,
    },
    removeOnComplete:{
        age:24*60*60,
        count:1000
    },
    removeOnFail:{
        age:7*24*60*60,
        count:5000
    }
}
