# TypeScript Standards

## Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2017",
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "noEmit": true,
    "isolatedModules": true,
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Strict Mode

`strict: true` enables all strict type-checking options:
- `strictNullChecks`
- `strictFunctionTypes`
- `strictBindCallApply`
- `noImplicitAny`
- `noImplicitThis`
- `alwaysStrict`

## Type Patterns

### Database Types (Inferred from Drizzle)

```tsx
import type { users, posts } from "@/db/schema";

// Select type (what you read)
export type User = typeof users.$inferSelect;
export type Post = typeof posts.$inferSelect;

// Insert type (what you write)
export type NewUser = typeof users.$inferInsert;
export type NewPost = typeof posts.$inferInsert;
```

### API Response Types (Generic)

```tsx
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
```

### Server Action Response (Discriminated Union)

```tsx
type ServerActionResponse<T> =
  | { data: T; error?: undefined; message?: undefined }
  | { data?: undefined; error: string; message?: undefined }
  | { data?: undefined; error?: undefined; message: string };
```

### Component Props

```tsx
export interface PageProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export interface LayoutProps {
  children: React.ReactNode;
}
```

## Type Exports

```tsx
// Barrel export in index.ts
export type { User, NewUser, Post, NewPost } from "@/db/schema";
export type { ApiResponse, PaginatedResponse } from "./api";
export type { PageProps, LayoutProps } from "./components";
```

## Avoid

- ❌ `any` — Use `unknown` and narrow
- ❌ `@ts-ignore` — Fix the type instead
- ❌ Non-null assertions (`!`) — Use type narrowing
- ❌ Type assertions (`as`) — Prefer type guards

## Prefer

- ✅ Inferred types from Drizzle schema
- ✅ Generic types for reusable patterns
- ✅ Discriminated unions for response types
- ✅ `unknown` over `any`
- ✅ Type narrowing with `if` checks
