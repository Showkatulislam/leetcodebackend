import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import {
    createProblemSchema,
    problemIdParamsSchema,
    problemListQuerySchema,
    updateProblemSchema,
} from "./problem.validation.js";
import { problemController } from "./problem.controller.js";
import { catchAsync } from "../../shared/utils/catch.async.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { assignTagsSchema, problemIdSchema } from "../tag/tag.validation.js";
import { tagController } from "../tag/tag.controller.js";

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
        params: problemIdParamsSchema,
    }),
    catchAsync(problemController.getProblemById.bind(problemController)),
);

router.patch(
    "/:id",
    authenticate,
    validate({
        params: problemIdParamsSchema,
        body: updateProblemSchema,
    }),
    catchAsync(problemController.updateProblem.bind(problemController)),
);

router.get(
    "/",
    validate({
        query: problemListQuerySchema,
    }),
    catchAsync(problemController.getAllProblems.bind(problemController)),
);

router.post(
    "/:problemId/tags",
    validate({
        params:problemIdSchema,
        body:assignTagsSchema
    }),
    catchAsync(
        tagController.assignTagsToProblem.bind(tagController)
    )
)

export default router;
