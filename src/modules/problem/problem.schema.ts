import { z } from "zod";

export const createProblemSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Problem title is required")
        .max(200, "Problem title must not exceed 200 characters"),

    slug: z
        .string()
        .trim()
        .min(1, "Problem slug is required")
        .max(200, "Problem slug must not exceed 200 characters")
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Slug must contain only lowercase letters, numbers, and hyphens",
        ),

    description: z
        .string()
        .trim()
        .min(1, "Problem description is required"),

    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),

    timeLimit: z
        .number()
        .int()
        .positive("Time limit must be greater than 0"),

    memoryLimit: z
        .number()
        .int()
        .positive("Memory limit must be greater than 0"),

    isPublished: z.boolean().optional(),
});

export type CreateProblemInput = z.infer<typeof createProblemSchema>;