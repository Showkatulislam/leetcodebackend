import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { createTagSchema, tagIdSchema } from "./tag.validation.js";
import { catchAsync } from "../../shared/utils/catch.async.js";
import { tagController } from "./tag.controller.js";
import { updateProblemSchema } from "../problem/problem.validation.js";

const router = Router();

router.post(
    "/",
    validate({
        body: createTagSchema,
    }),
    catchAsync(tagController.createTag.bind(tagController)),
);

router.patch(
    "/:id",
    validate({
        params:tagIdSchema,
        body:updateProblemSchema
    }),
    catchAsync(tagController.updateTag.bind(tagController))
)
router.delete(
    "/:id",
    validate({
        params: tagIdSchema,
    }),
    catchAsync(tagController.deleteTag.bind(tagController)),
);


export default router;
