import { z } from "zod";

export const createTagSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Tag name must be at least 2 characters")
        .max(50, "Tag name must not exceed 50 characters"),
});
export const upadateTagSchema = createTagSchema.partial();

export const tagIdSchema = z.object({
    id: z.string().uuid("Invalid tag ID"),
});
export const assignTagsSchema = z.object({
    tagIds: z
        .array(z.string().uuid("Invalid tag ID"))
        .min(1, "At least one tag is required")
        .max(10, "A maximum of 10 tags can be assigned")
        .refine(
            (tagIds)=>new Set(tagIds).size === tagIds.length,{
                 message: "Duplicate tag IDs are not allowed",
            }
        )
});

export const problemIdSchema = z.object({
    problemId:z.string().uuid("Invalid problem ID.")
})