import { z } from "zod";

export const createLanguageConfigurationSchema = z.object({
    languageId: z.string().uuid("Invalid language ID."),

    runtimeImage: z.string().trim().min(1, "Runtime image is required.").max(255),

    sourceFile: z.string().trim().min(1, "Source file is required.").max(100),

    compileCommand: z.string().trim().max(1000).optional(),

    runCommand: z.string().trim().min(1, "Run command is required.").max(1000),

    defaultTimeLimit: z.number().int().positive().optional(),

    defaultMemoryLimit: z.number().int().positive().optional(),
});

export const updateLanguageConfigurationSchema = z
    .object({
        runtimeImage: z.string().trim().min(1).max(255).optional(),

        sourceFile: z.string().trim().min(1).max(100).optional(),

        compileCommand: z.string().trim().max(1000).nullable().optional(),

        runCommand: z.string().trim().min(1).max(1000).optional(),

        defaultTimeLimit: z.number().int().positive().optional(),

        defaultMemoryLimit: z.number().int().positive().optional(),

        isActive: z.boolean().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field must be provided.",
    });
