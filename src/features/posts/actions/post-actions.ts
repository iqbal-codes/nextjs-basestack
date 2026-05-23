"use server";

import { and, desc, eq, like, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createPostSchema, updatePostSchema } from "@/features/posts/schemas";
import { routing } from "@/i18n/routing";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { auth } from "@/lib/auth";

type ServerActionResponse<T> =
  | { data: T; error?: undefined; message?: undefined }
  | { data?: undefined; error: string; message?: undefined }
  | { data?: undefined; error?: undefined; message: string };

// ============================================================================
// Server Actions for Posts
// ============================================================================

function revalidateLocalizedPath(pathname: string) {
  for (const locale of routing.locales) {
    revalidatePath(`/${locale}${pathname}`);
  }
}

export async function createPost(
  formData: FormData,
): Promise<ServerActionResponse<{ id: string }>> {
  try {
    // 1. Validate authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { error: "Unauthorized" };
    }

    // 2. Parse and validate form data
    const rawData = {
      title: formData.get("title") as string,
      content: (formData.get("content") as string) || undefined,
      published: formData.get("published") === "true",
      tags: JSON.parse((formData.get("tags") as string) || "[]"),
    };

    const validatedData = createPostSchema.parse(rawData);

    // 3. Create post
    const [post] = await db
      .insert(posts)
      .values({
        ...validatedData,
        authorId: session.user.id,
      })
      .returning({ id: posts.id });

    // 4. Revalidate cache
    revalidateLocalizedPath("/posts");

    return { data: { id: post.id } };
  } catch (error) {
    console.error("Create post error:", error);
    return { error: "Failed to create post" };
  }
}

export async function updatePost(
  id: string,
  formData: FormData,
): Promise<ServerActionResponse<void>> {
  try {
    // 1. Validate authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { error: "Unauthorized" };
    }

    // 2. Check ownership
    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.id, id),
    });

    if (!existingPost) {
      return { error: "Post not found" };
    }

    if (existingPost.authorId !== session.user.id) {
      return { error: "Forbidden" };
    }

    // 3. Parse and validate form data
    const rawData = {
      title: (formData.get("title") as string) || undefined,
      content: (formData.get("content") as string) || undefined,
      published: formData.get("published") === "true" ? true : undefined,
      tags: formData.get("tags") ? JSON.parse(formData.get("tags") as string) : undefined,
    };

    const validatedData = updatePostSchema.parse({ id, ...rawData });

    // 4. Update post
    const { id: _, ...updateData } = validatedData;
    await db
      .update(posts)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, id));

    // 5. Revalidate cache
    revalidateLocalizedPath("/posts");
    revalidateLocalizedPath(`/posts/${id}`);

    return { message: "Post updated successfully" };
  } catch (error) {
    console.error("Update post error:", error);
    return { error: "Failed to update post" };
  }
}

export async function deletePost(id: string): Promise<ServerActionResponse<void>> {
  try {
    // 1. Validate authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { error: "Unauthorized" };
    }

    // 2. Check ownership
    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.id, id),
    });

    if (!existingPost) {
      return { error: "Post not found" };
    }

    if (existingPost.authorId !== session.user.id) {
      return { error: "Forbidden" };
    }

    // 3. Delete post
    await db.delete(posts).where(eq(posts.id, id));

    // 4. Revalidate cache
    revalidateLocalizedPath("/posts");

    return { message: "Post deleted successfully" };
  } catch (error) {
    console.error("Delete post error:", error);
    return { error: "Failed to delete post" };
  }
}

export async function getPosts(params?: {
  page?: number;
  limit?: number;
  search?: string;
  published?: boolean;
  authorId?: string;
}): Promise<{
  posts: Array<{
    id: string;
    title: string;
    content: string | null;
    published: boolean;
    authorId: string;
    tags: string[] | null;
    createdAt: Date;
    updatedAt: Date;
  }>;
  total: number;
  page: number;
  limit: number;
}> {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;
  const offset = (page - 1) * limit;

  // Build query conditions
  const conditions = [];

  if (params?.search) {
    conditions.push(like(posts.title, `%${params.search}%`));
  }

  if (params?.published !== undefined) {
    conditions.push(eq(posts.published, params.published));
  }

  if (params?.authorId) {
    conditions.push(eq(posts.authorId, params.authorId));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Execute queries
  const [postsResult, countResult] = await Promise.all([
    db.query.posts.findMany({
      where: whereClause,
      orderBy: [desc(posts.createdAt)],
      limit,
      offset,
    }),
    db.select({ count: sql<number>`count(*)` }).from(posts).where(whereClause),
  ]);

  return {
    posts: postsResult,
    total: Number(countResult[0]?.count ?? 0),
    page,
    limit,
  };
}
