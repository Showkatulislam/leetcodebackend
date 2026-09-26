import rateLimit from "express-rate-limit";
import { success } from "zod";

export const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many request.Please try again later.",
        errorCode: "RATE_LIMIT_EXCEEDED.",
    },
});

export const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many login attempts. Please try again later.",
        errorCode: "LOGIN_RATE_LIMIT_EXCEEDED",
    },
});

export const registerRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many registration attempts. Please try again later.",
        errorCode: "REGISTER_RATE_LIMIT_EXCEEDED",
    },
});

export const passwordResetRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many password reset requests. Please try again later.",
        errorCode: "PASSWORD_RESET_RATE_LIMIT_EXCEEDED",
    },
});
