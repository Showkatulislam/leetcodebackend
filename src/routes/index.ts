import { Router } from "express";
import testRouter from "./../modules/test/test.route.js";
import healthRouter from "./../modules/health/health.route.js";

const router = Router();

router.use("/health", healthRouter);
router.use("/test", testRouter);

export default router;
