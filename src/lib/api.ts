/**
 * API helper functions for TanStack Query
 * These functions make direct database calls via server actions
 */

import type { Post, Profile, User } from "@/types";

// ============================================================================
// Posts API
// ============================================================================

export async function fetchPosts(params?: {
  page?: number;
  limit?: number;
  search?: string;
  authorId?: string;
  published?: boolean;
}): Promise<{ posts: Post[]; total: number; page: number; limit: number }> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.search) searchParams.set("search", params.search);
  if (params?.authorId) searchParams.set("authorId", params.authorId);
  if (params?.published !== undefined) searchParams.set("published", String(params.published));

  const response = await fetch(`/api/posts?${searchParams.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
}

export async function fetchPost(id: string): Promise<Post> {
  const response = await fetch(`/api/posts/${id}`);
  if (!response.ok) throw new Error("Failed to fetch post");
  return response.json();
}

// ============================================================================
// Users API
// ============================================================================

export async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
}

export async function fetchUserProfile(userId: string): Promise<Profile | null> {
  const response = await fetch(`/api/users/${userId}/profile`);
  if (!response.ok) throw new Error("Failed to fetch profile");
  return response.json();
}
