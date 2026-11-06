import { z } from "zod";

export const createTestCaseSchema = z.object({
    input: z.string().min(1, "Input is required"),
    expected: z.string().min(1, "Expected output is required"),
    isPublic: z.boolean().optional().default(false),
});

export const updateTestCaseSchema = z
    .object({
        input: z.string().min(1).optional(),
        expected: z.string().min(1).optional(),
        isPublic: z.boolean().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field is required",
    });
