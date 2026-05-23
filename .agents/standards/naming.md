# Naming Conventions

## File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Feature modules | kebab-case | `auth/`, `posts/`, `chat/` |
| Components | kebab-case | `posts-list.tsx`, `post-form.tsx` |
| UI primitives | kebab-case | `button.tsx`, `card.tsx`, `dialog.tsx` |
| Hooks | `use-` prefix, kebab-case | `use-posts.ts`, `use-filters.ts` |
| Actions | kebab-case | `post-actions.ts`, `auth-actions.ts` |
| Schemas | kebab-case | `post.ts`, `auth.ts` |
| Stores | kebab-case | `post-store.ts` |
| Types | kebab-case | `index.ts`, `server-action.ts` |
| Lib | kebab-case | `utils.ts`, `api.ts`, `auth.ts` |
| Config | kebab-case | `drizzle.config.ts`, `biome.json` |

## Code Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `PostsList`, `CreatePostDialog`, `Button` |
| Hooks | `use` prefix, camelCase | `usePosts`, `usePostFilters`, `usePagination` |
| Functions | camelCase | `createPost`, `fetchPosts`, `makeQueryClient` |
| Variables | camelCase | `queryClient`, `browserQueryClient` |
| Schemas | camelCase + `Schema` | `createPostSchema`, `signInSchema` |
| Types/Interfaces | PascalCase | `User`, `Post`, `ApiResponse<T>`, `PageProps` |
| DB tables | snake_case | `users`, `posts`, `user_id` |
| DB columns | snake_case | `created_at`, `author_id` |
| DB indexes | snake_case + `_idx` | `email_idx`, `author_id_idx` |
| Constants | camelCase or UPPER_SNAKE | `protectedRoutes`, `API_URL` |

## Export Naming

| Pattern | Example |
|---------|---------|
| Default export | `export default function Page()` |
| Named component | `export function PostsList()` |
| Named hook | `export function usePosts()` |
| Named action | `export async function createPost()` |
| Type export | `export type User = ...` |
| Barrel export | `export * from "./hooks"` |

## Path Aliases

```typescript
// tsconfig.json
"@/*": ["./src/*"]

// Usage
import { db } from "@/db";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/features/posts/hooks";
```

## Feature Module Structure

```
features/
├── feature-name/
│   ├── actions/        # Server actions
│   ├── components/     # UI components
│   ├── hooks/          # Feature-specific hooks
│   ├── schemas/        # Zod validation schemas
│   ├── stores/         # Zustand stores (if needed)
│   └── index.ts        # Barrel export
```

## Quick Reference

```bash
# Feature modules
features/auth/           # Authentication feature
features/posts/          # Posts feature
features/chat/           # Chat feature

# Shared modules
components/              # UI primitives
lib/                     # Utilities
db/                      # Database
types/                   # Types
hooks/                   # Shared hooks

# Files
post-actions.ts          # Server actions
use-posts.ts             # Custom hook
posts-list.tsx           # Component
post.ts                  # Schema
post-store.ts            # Zustand store
```
