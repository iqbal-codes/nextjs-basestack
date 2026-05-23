# DO — Guardrails

## Feature Organization
- ✅ Keep features in `src/features/` with consistent internal structure
- ✅ Use barrel exports (`index.ts`) for each feature module
- ✅ Import from feature barrel, not deep paths when possible
- ✅ Keep shared code at root (`src/components/`, `src/lib/`, `src/db/`, `src/types/`, `src/hooks/`)

## Server Components
- ✅ Use Server Components by default
- ✅ Add `"use client"` only when needed (interactivity, hooks, browser APIs)
- ✅ Fetch data in Server Components when possible
- ✅ Lift client boundary down — keep as much server-side as possible

## Validation
- ✅ Validate all user input with Zod schemas
- ✅ Validate in both Server Actions (server-side) and forms (client-side)
- ✅ Export both schema and inferred TypeScript type
- ✅ Use `zodResolver` for React Hook Form integration

## Server Actions
- ✅ Use `ServerActionResponse<T>` discriminated union for returns
- ✅ Check auth first in every Server Action
- ✅ Check ownership for updates/deletes
- ✅ Add `revalidatePath()` after mutations that affect cached data
- ✅ Return exactly one variant (data OR error OR message)

## State Management
- ✅ Use TanStack Query for server state (API data)
- ✅ Use Zustand for client-only state (UI, drafts)
- ✅ Use nuqs for URL state (filters, pagination)
- ✅ Use `invalidateQueries` to trigger refetch after mutations

## UI Components
- ✅ Use `cn()` utility for conditional class names
- ✅ Use `class-variance-authority` for component variants
- ✅ Use compound component pattern (Card, CardHeader, CardContent)
- ✅ Use `data-slot` attributes for CSS targeting

## TypeScript
- ✅ Infer DB types from Drizzle schema (`typeof table.$inferSelect`)
- ✅ Use `unknown` over `any`
- ✅ Use type narrowing instead of assertions
- ✅ Export types from barrel files

## Code Quality
- ✅ Use barrel exports (`index.ts`) for modules
- ✅ Run `biome check --write src/` before committing
- ✅ Match existing code style
- ✅ Keep components focused — one responsibility

## Import Paths
- ✅ Use `@/components/ui/*` for shadcn/ui primitives
- ✅ Use `@/components/` for app-level shared components (non-shadcn)
- ✅ Use `@/lib/`, `@/db/`, `@/types/`, `@/hooks/` for shared code
- ✅ Use `@/features/*` for feature-specific code
- ✅ Use `@/app/*` for route-only code
- ✅ Import from feature barrel when possible
