import { z } from "zod";

// ============================================================================
// Profile Schemas
// ============================================================================

export const updateProfileSchema = z.object({
  bio: z.string().max(500, "Bio must be less than 500 characters").optional().or(z.literal("")),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  location: z
    .string()
    .max(100, "Location must be less than 100 characters")
    .optional()
    .or(z.literal("")),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
