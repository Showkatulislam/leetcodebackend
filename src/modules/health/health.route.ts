import { Router } from "express";
import { healthController } from "./health.controller.js";

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Check API health
 *     tags:
 *       - Health
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *           maxLength: 50
 *         description: Name used for the health response
 *     responses:
 *       200:
 *         description: API is healthy
 *       400:
 *         description: Validation failed
 */
router.get("/", healthController.healthCheck);

export default router;
