import { z } from "zod";

export const createLanguageSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Language name is required")
        .max(50, "Language name must not exceed 50 characters"),

    slug: z
        .string()
        .trim()
        .min(1, "Language slug is required")
        .max(50, "Language slug must not exceed 50 characters")
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Slug must contain only lowercase letters, numbers, and hyphens",
        ),

    version: z.string().trim().max(30, "Language version must not exceed 30 characters").optional(),
});

export const updateLanguageSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Language name is required")
        .max(50, "Language name must not exceed 50 characters")
        .optional(),

    slug: z
        .string()
        .trim()
        .min(1, "Language slug is required")
        .max(50, "Language slug must not exceed 50 characters")
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Slug must contain only lowercase letters, numbers, and hyphens",
        )
        .optional(),

    version: z.string().trim().max(30, "Language version must not exceed 30 characters").optional(),

    isActive: z.boolean().optional(),
});
