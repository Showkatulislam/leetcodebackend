import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { catchAsync } from "../../shared/utils/catch.async.js";
import { languageConfigurationController } from "./configuration.controller.js";
import { authorize } from "../../middlewares/authorize.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createLanguageConfigurationSchema, updateLanguageConfigurationSchema } from "./configuration.validation.js";


const router = Router()


router.get(
    "/language/:languageId",
    authenticate,
    catchAsync(
        languageConfigurationController.getByLanguageId
    )
);

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    validate({body:createLanguageConfigurationSchema}),
    catchAsync(
        languageConfigurationController.create
    )
)

router.patch(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    validate({body:updateLanguageConfigurationSchema}),
    catchAsync(
        languageConfigurationController.update
    )
)


export default router;