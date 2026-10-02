import { z } from "zod";

export const createProblemSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters long")
        .max(200, "Title must not exceed 200 characters"),

    slug: z
        .string()
        .trim()
        .min(3, "Slug must be at least 3 characters long")
        .max(200, "Slug must not exceed 200 characters")
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Slug must contain only lowercase letters, numbers, and hyphens",
        ),

    description: z.string().trim().min(10, "Description must be at least 10 characters long"),

    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),

    timeLimit: z
        .number()
        .int("Time limit must be an integer")
        .positive("Time limit must be greater than 0"),

    memoryLimit: z
        .number()
        .int("Memory limit must be an integer")
        .positive("Memory limit must be greater than 0"),
});

export const updateProblemSchema = createProblemSchema.partial().extend({
    isPublished: z.boolean().optional(),
});


export const problemIdParamsSchema=z.object({
     id: z.string().uuid("Invalid problem ID"),
})