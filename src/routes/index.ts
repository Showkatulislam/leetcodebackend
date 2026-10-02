import { Router } from "express";
import testRouter from "./../modules/test/test.route.js";
import healthRouter from "./../modules/health/health.route.js";
import authRouter from "./../modules/auth/auth.route.js";
import userRouter from "./../modules/user/user.route.js";
import problemRouter from "./../modules/problem/problem.route.js";
import tagRouter from './../modules/tag/tag.route.js';

const router = Router();

router.use("/health", healthRouter);
router.use("/test", testRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/problems", problemRouter);
router.use("/tags",tagRouter)

export default router;
