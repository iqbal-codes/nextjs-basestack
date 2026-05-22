import { z } from "zod";

// ============================================================================
// Post Schemas
// ============================================================================

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
  content: z.string().optional(),
  published: z.boolean(),
  tags: z.array(z.string()),
});

export const updatePostSchema = z.object({
  id: z.string().min(1, "Post ID is required"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters")
    .optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export const postFilterSchema = z.object({
  search: z.string().optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  published: z.boolean().optional(),
  authorId: z.string().optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type PostFilterInput = z.infer<typeof postFilterSchema>;
