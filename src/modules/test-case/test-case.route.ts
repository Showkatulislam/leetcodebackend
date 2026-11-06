import { Router } from "express";
import { TestCaseRepository } from "./test-case.repository.js";
import prisma from "../../lib/prisma.js";
import { TestCaseService } from "./test-case.service.js";
import { TestCaseController } from "./test-case.controller.js";
import { problemRepository } from "../problem/problem.respository.js";

const router = Router();

const testCaseRepository = new TestCaseRepository(prisma);
const testCaseService = new TestCaseService(testCaseRepository, problemRepository);
const testCaseController = new TestCaseController(testCaseService);

router.post("/", testCaseController.create);

router.get("/:id", testCaseController.getById);

router.patch("/:id", testCaseController.update);

router.delete("/:id", testCaseController.delete);

router.get("/problem/:problemId", testCaseController.getByProblem);

router.get("/problem/:problemId/public", testCaseController.getPublicByProblem);

export default router;
