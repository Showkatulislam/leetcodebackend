import { Router } from "express";
import { catchAsync } from "../../shared/utils/catch.async.js";
import { langaugeController } from "./language.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createLanguageSchema, updateLanguageSchema } from "./language.validation.js";

const router = Router();

router.get("/", catchAsync(langaugeController.getAll));

router.get("/:id", catchAsync(langaugeController.getById));

router.post(
    "/",
    validate({
        body: createLanguageSchema,
    }),
    catchAsync(langaugeController.create),
);

router.patch(
    "/:id",
    validate({
        body: updateLanguageSchema,
    }),
    catchAsync(langaugeController.update),
);

router.delete("/:id", catchAsync(langaugeController.delete));

router.get(
    "/supported",
    catchAsync(
        langaugeController.getSupported
    )
)

export default router;
