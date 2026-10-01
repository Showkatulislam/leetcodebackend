import { z } from "zod";

export const createProblemSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(200, "Title cannot exceed 200 characters"),

    slug: z
        .string()
        .trim()
        .min(3, "Slug must be at least 3 characters")
        .max(200, "Slug cannot exceed 200 characters")
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Slug must contain only lowercase letters, numbers, and hyphens",
        ),

    description: z
        .string()
        .trim()
        .min(
            10,
            "Description must be at least 10 characters",
        ),

    difficulty: z.enum([
        "EASY",
        "MEDIUM",
        "HARD",
    ]),

    isPublished: z
        .boolean()
        .optional(),

    timeLimit: z
        .number()
        .int()
        .positive(),

    memoryLimit: z
        .number()
        .int()
        .positive(),
});

export const updateProblemSchema = z
    .object({
        title: z
            .string()
            .trim()
            .min(
                3,
                "Title must be at least 3 characters",
            )
            .max(
                200,
                "Title cannot exceed 200 characters",
            )
            .optional(),

        slug: z
            .string()
            .trim()
            .min(
                3,
                "Slug must be at least 3 characters",
            )
            .max(
                200,
                "Slug cannot exceed 200 characters",
            )
            .regex(
                /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                "Slug must contain only lowercase letters, numbers, and hyphens",
            )
            .optional(),

        description: z
            .string()
            .trim()
            .min(
                10,
                "Description must be at least 10 characters",
            )
            .optional(),

        difficulty: z
            .enum([
                "EASY",
                "MEDIUM",
                "HARD",
            ])
            .optional(),

        isPublished: z
            .boolean()
            .optional(),

        timeLimit: z
            .number()
            .int()
            .positive()
            .optional(),

        memoryLimit: z
            .number()
            .int()
            .positive()
            .optional(),
    })
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field is required",
        },
    );

export const problemIdSchema = z.object({
    id: z
        .string()
        .uuid("Invalid problem ID"),
});

export const problemSearchSchema = z.object({
    search: z
        .string()
        .trim()
        .min(1, "Search query cannot be empty")
        .max(
            100,
            "Search query cannot exceed 100 characters",
        ),
});


export const problemFilterSchema = z.object({
    difficulty: z
        .enum([
            "EASY",
            "MEDIUM",
            "HARD",
        ])
        .optional(),
});