import { Router } from "express";

import { authController } from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { loginSchema, logoutSchema, registerSchema } from "./auth.validation.js";

const router = Router();

router.post(
    "/register",
    validate({
        body: registerSchema,
    }),
    authController.register,
);

router.post(
    "/login",
    validate({
        body:loginSchema
    }),
    authController.login
)

router.post(
    "/logout",
    validate({
        body:logoutSchema
    }),
    authController.logout
)
export default router;
