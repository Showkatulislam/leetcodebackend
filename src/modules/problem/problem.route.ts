import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { createProblemSchema, problemIdParamsSchema } from "./problem.validation.js";
import { problemController } from "./problem.controller.js";
import { catchAsync } from "../../shared/utils/catch.async.js";
import { authenticate } from "../../middlewares/authenticate.js";

const router = Router();

router.post(
    "/",
    authenticate,
    validate({
        body: createProblemSchema,
    }),
    catchAsync(problemController.createProblem.bind(problemController)),
);

router.get(
    "/:id",
    validate({
        params:problemIdParamsSchema
    }),
    catchAsync(problemController.getProblemById.bind(problemController))
)

export default router;