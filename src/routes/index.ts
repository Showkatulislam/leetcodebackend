import { Router } from "express";
import { healthController } from "../modules/health/health.controller.js";
import testRouter from "./../modules/test/test.route.js";

const router = Router();

router.get("/health", healthController.healthCheck);
router.use("/test", testRouter);

export default router;
