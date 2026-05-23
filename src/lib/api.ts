import type { PaginatedResponse, Post, PostQueryParams } from "@/types";

const API_BASE = "";

export async function fetchPosts(params?: PostQueryParams): Promise<{
  posts: Post[];
  total: number;
  page: number;
  limit: number;
}> {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.search) searchParams.set("search", params.search);
  if (params?.authorId) searchParams.set("authorId", params.authorId);
  if (params?.published !== undefined) searchParams.set("published", String(params.published));
  if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);

  const response = await fetch(`${API_BASE}/api/posts?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export async function fetchPost(id: string): Promise<Post> {
  const response = await fetch(`${API_BASE}/api/posts/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  return response.json();
}

export async function fetchUsers(): Promise<unknown[]> {
  const response = await fetch(`${API_BASE}/api/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function fetchProfiles(): Promise<unknown[]> {
  const response = await fetch(`${API_BASE}/api/profiles`);

  if (!response.ok) {
    throw new Error("Failed to fetch profiles");
  }

  return response.json();
}
