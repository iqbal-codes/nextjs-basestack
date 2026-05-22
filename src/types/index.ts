import type { accounts, posts, profiles, sessions, users } from "@/db/schema";

// ============================================================================
// Database Types (inferred from schema)
// ============================================================================

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type Account = typeof accounts.$inferSelect;

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============================================================================
// Query Types
// ============================================================================

export interface PostQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  authorId?: string;
  published?: boolean;
  sortBy?: "createdAt" | "updatedAt" | "title";
  sortOrder?: "asc" | "desc";
}

// ============================================================================
// Component Props Types
// ============================================================================

export interface PageProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export interface LayoutProps {
  children: React.ReactNode;
}
