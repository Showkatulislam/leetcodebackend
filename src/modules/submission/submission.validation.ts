
import { z } from "zod";

export const createSubmissionSchema = z.object({
    problemId: z
        .string()
        .uuid("Invalid problem ID."),

    languageId: z
        .string()
        .uuid("Invalid language ID."),

    code: z
        .string()
        .min(1, "Source code is required.")
        .max(100_000, "Source code must not exceed 100,000 characters."),
});
