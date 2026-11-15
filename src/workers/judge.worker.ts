import { createJudgeWorker } from "../infrastructure/queue/judge.worker.js";


const worker = createJudgeWorker({
    processSubmission:async(submissionId:string):Promise<void>=>{
        console.info("Processing submission ",submissionId)
    }
})

const shutdown = async():Promise<void>=>{
      console.info("Shutting down judge worker...");
      await worker.close()
      console.info("Judge worker stopped.");
}

process.on("SIGTERM",():void=>{
    void shutdown()
})

process.on("SIGINT",():void=>{
    void shutdown()
})