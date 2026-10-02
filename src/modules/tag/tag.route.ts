import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { createTagSchema } from "./tag.validation.js";
import { catchAsync } from "../../shared/utils/catch.async.js";
import { tagController } from "./tag.controller.js";


const router = Router();

router.post(
    "/",
    validate({
        body: createTagSchema,
    }),
    catchAsync(tagController.createTag.bind(tagController)),
);

export default router;