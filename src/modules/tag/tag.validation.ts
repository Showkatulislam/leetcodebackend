import { z } from "zod";

export const createTagSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Tag name must be at least 2 characters")
        .max(50, "Tag name must not exceed 50 characters"),
});