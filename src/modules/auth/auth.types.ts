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

export type RegisterInput = z.infer<typeof registerSchema>;
