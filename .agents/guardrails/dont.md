# DON'T — Guardrails

## Feature Organization
- ❌ Don't put feature code in `src/app/` — routes only
- ❌ Don't put shared code in `src/features/` — use `src/lib/`, `src/components/`, `src/db/`, etc.
- ❌ Don't import deep into features from other features — use barrel exports
- ❌ Don't create circular dependencies between features

## Server Components
- ❌ Don't use `useState`, `useEffect`, `useRouter` in Server Components
- ❌ Don't pass functions as props from Server → Client (use Server Actions)
- ❌ Don't fetch data in Client Components (move to Server Component or API route)

## Types
- ❌ Don't use `any` type — use `unknown` and narrow
- ❌ Don't use `@ts-ignore` — fix the type instead
- ❌ Don't use non-null assertions (`!`) — use type narrowing
- ❌ Don't use type assertions (`as`) — prefer type guards

## Validation
- ❌ Don't skip Zod validation in Server Actions
- ❌ Don't trust client input — always validate server-side
- ❌ Don't inline validation logic — use schemas from feature schemas/

## Server Actions
- ❌ Don't return both `data` and `error` — pick one variant
- ❌ Don't expose internal errors — return generic messages
- ❌ Don't skip auth checks — every action needs session validation
- ❌ Don't skip ownership checks — verify `authorId === session.user.id`

## State Management
- ❌ Don't use `useQuery` for mutations — use `useMutation`
- ❌ Don't mutate React Query cache directly — use `invalidateQueries`
- ❌ Don't put large objects in URL params — use nuqs for simple filters
- ❌ Don't create new QueryClient in browser — use singleton (see `providers.tsx`)
- ❌ Don't mix server and client state in same store

## UI/Styling
- ❌ Don't use raw template literals for classes — use `cn()`
- ❌ Don't manually switch className for variants — use `cva`
- ❌ Don't add rounded corners — project uses `rounded-none`

## Code Quality
- ❌ Don't use `console.log` in production code
- ❌ Don't hardcode API endpoints — use relative URLs or env vars
- ❌ Don't use `confirm()` in production — use Dialog component
- ❌ Don't use `revalidatePath` excessively — only when cache needs invalidation
- ❌ Don't refactor code that isn't broken
- ❌ Don't "improve" adjacent code when making changes
- ❌ Don't add features beyond what was asked

## Import Paths
- ❌ Don't use `@/shared/*` — shadcn primitives are at `@/components/ui/*`, shared code at `@/lib/`, `@/db/`, `@/types/`, `@/hooks/`
- ❌ Don't use `@/schemas/*` — use feature-specific schemas
- ❌ Don't use `@/stores/*` — use feature-specific stores
- ❌ Don't use `@/actions/*` — use feature-specific actions
- ❌ Don't import shadcn primitives from `@/components/*` directly — use `@/components/ui/*`
