import { Router } from "express";

import { authController } from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
    forgotPasswordSchema,
    loginSchema,
    logoutSchema,
    registerSchema,
    resendVerificationSchema,
    resetPasswordSchema,
    verifyEmailSchema,
} from "./auth.validation.js";
import { resendVerificationRateLimiter } from "../../middlewares/rate-limit.middleware.js";

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
        body: loginSchema,
    }),
    authController.login,
);

router.post(
    "/logout",
    validate({
        body: logoutSchema,
    }),
    authController.logout,
);

router.post(
    "/forgot-password",
    validate({ body: forgotPasswordSchema }),
    authController.forgotPassword,
);

router.post(
    "/reset-password",
    validate({
        body: resetPasswordSchema,
    }),
    authController.resetPassword,
);

router.post(
    "/verify-email",
    validate({body:verifyEmailSchema}),
    authController.verifyEmail
);
router.post(
    "/resend-verification",
    resendVerificationRateLimiter,
    validate({
        body:resendVerificationSchema
    }),
    authController.resendVerification
)


export default router;
