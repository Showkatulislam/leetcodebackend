import { z } from "zod";

export const registerSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must not exceed 30 characters")
        .trim(),

    email: z.string().email("Invalid email address").trim().toLowerCase(),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must not exceed 100 characters"),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address").trim().toLowerCase(),

    password: z.string().min(1, "Password is required"),
});
export const logoutSchema = z.object({
    refreshToken: z
        .string()
        .min(1, "Refresh token is required"),
});


export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type LogoutInput = z.infer<
    typeof logoutSchema
>;
