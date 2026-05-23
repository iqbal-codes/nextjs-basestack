# Data Flow Pattern

## Overview

This project uses a unidirectional data flow with clear separation between URL state, server cache state, and client ephemeral state.

## Flow Diagram

```
URL params (nuqs) → useFilters hook → usePosts (TanStack Query) → API route → Drizzle → SQLite
                                                                                          ↑
Server Actions ← FormData ← react-hook-form + Zod schemas ──────────────────────────────────┘
     ↓
revalidatePath() → Next.js cache invalidation → re-fetch
```

## State Management Split

| State Type | Library | Location | Persistence |
|-----------|---------|----------|-------------|
| URL state (filters, pagination) | nuqs | `src/hooks/use-filters.ts` | URL search params |
| Server cache (API data) | TanStack Query | `src/features/posts/hooks/use-posts.ts` | In-memory (staleTime: 1min) |
| Client ephemeral (UI, drafts) | Zustand | `src/features/posts/stores/` | localStorage (UI) / memory (drafts) |

## Read Path (Server → Client)

1. Server Component fetches data directly (or API route handles request)
2. Drizzle queries SQLite database
3. Data passed as props to Client Components
4. TanStack Query manages cache + re-fetching on client

## Write Path (Client → Server)

1. Form component collects input via react-hook-form
2. Zod schema validates input (client-side via zodResolver)
3. Server Action receives FormData
4. Server Action validates again with Zod (server-side)
5. Server Action checks auth + ownership
6. Drizzle performs database operation
7. `revalidatePath()` invalidates Next.js cache
8. TanStack Query refetches stale data

## Key Files

- `src/hooks/use-filters.ts` — URL state with nuqs
- `src/features/posts/hooks/use-posts.ts` — TanStack Query hooks
- `src/lib/api.ts` — API fetch helpers
- `src/features/posts/actions/post-actions.ts` — Server Actions
- `src/lib/providers.tsx` — QueryClient configuration
