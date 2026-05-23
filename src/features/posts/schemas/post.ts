import { z } from "zod";

// ============================================================================
// Post Schemas
// ============================================================================

type PostValidationMessages = {
  titleRequired: string;
  titleMax: string;
  postIdRequired: string;
};

const defaultPostValidationMessages: PostValidationMessages = {
  titleRequired: "Title is required",
  titleMax: "Title must be less than 255 characters",
  postIdRequired: "Post ID is required",
};

export function createCreatePostSchema(
  messages: Pick<
    PostValidationMessages,
    "titleRequired" | "titleMax"
  > = defaultPostValidationMessages,
) {
  return z.object({
    title: z.string().min(1, messages.titleRequired).max(255, messages.titleMax),
    content: z.string().optional(),
    published: z.boolean(),
    tags: z.array(z.string()),
  });
}

export function createUpdatePostSchema(
  messages: PostValidationMessages = defaultPostValidationMessages,
) {
  return z.object({
    id: z.string().min(1, messages.postIdRequired),
    title: z.string().min(1, messages.titleRequired).max(255, messages.titleMax).optional(),
    content: z.string().optional(),
    published: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  });
}

export const createPostSchema = createCreatePostSchema();
export const updatePostSchema = createUpdatePostSchema();

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
