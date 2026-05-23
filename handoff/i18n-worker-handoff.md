# i18n Worker Handoff

## Implemented

- Added `next-intl@4.12.0` and updated `bun.lock`.
- Configured `next-intl` in `next.config.ts`.
- Added i18n infrastructure:
  - `src/i18n/routing.ts` (`en`, `id`, default `en`, always-prefixed locale URLs)
  - `src/i18n/request.ts`
  - `src/i18n/navigation.ts`
- Added locale message catalogs:
  - `messages/en.json`
  - `messages/id.json`
- Moved localized app UI under `src/app/[locale]/...` while leaving `src/app/api/...` outside localization.
- Replaced root `middleware.ts` with Next.js 16 `proxy.ts` that:
  - runs `next-intl` routing
  - preserves existing Better Auth cookie checks
  - strips locale prefixes before protected/auth route matching
  - redirects unauthenticated users to localized sign-in URLs
  - preserves localized `callbackUrl`
  - redirects signed-in users away from localized auth pages to localized dashboard
- Applied review fixes after fresh reviewer fanout:
  - centralized auth callback redirect/link helpers in `src/features/auth/lib/redirect.ts`
  - preserved `callbackUrl` when switching sign-in ↔ sign-up
  - changed client auth failures to show localized generic error copy instead of raw Better Auth/library text
- Localized visible UI copy for:
  - home page
  - auth layout/sign-in/sign-up
  - dashboard layout/dashboard page
  - posts page, filters, list, create dialog, post form
  - localized not-found and error pages
  - sign-out button
- Converted auth Zod schemas to locale-aware schema factories while preserving default schema exports and inferred types.
- Converted post Zod schemas to locale-aware schema factories while preserving default schema exports and inferred types.
- Updated localized navigation usage to use `@/i18n/navigation` wrappers where needed.
- Updated localized post server-action revalidation to revalidate all configured locale paths.

## Changed files

Primary i18n files:
- `package.json`
- `bun.lock`
- `next.config.ts`
- `proxy.ts`
- `messages/en.json`
- `messages/id.json`
- `src/i18n/routing.ts`
- `src/i18n/request.ts`
- `src/i18n/navigation.ts`

Localized route files:
- `src/app/[locale]/layout.tsx`
- `src/app/[locale]/page.tsx`
- `src/app/[locale]/loading.tsx`
- `src/app/[locale]/not-found.tsx`
- `src/app/[locale]/error.tsx`
- `src/app/[locale]/(auth)/layout.tsx`
- `src/app/[locale]/(auth)/sign-in/page.tsx`
- `src/app/[locale]/(auth)/sign-up/page.tsx`
- `src/app/[locale]/(dashboard)/layout.tsx`
- `src/app/[locale]/(dashboard)/dashboard/page.tsx`
- `src/app/[locale]/(dashboard)/posts/page.tsx`

Localized feature files:
- `src/features/auth/components/sign-in-form.tsx`
- `src/features/auth/components/sign-up-form.tsx`
- `src/features/auth/components/sign-in-form.tsx`
- `src/features/auth/components/sign-up-form.tsx`
- `src/features/auth/components/sign-out-button.tsx`
- `src/features/auth/actions/auth-actions.ts`
- `src/features/auth/lib/redirect.ts`
- `src/features/auth/schemas/auth.ts`
- `src/features/posts/actions/post-actions.ts`
- `src/features/posts/components/create-post-dialog.tsx`
- `src/features/posts/components/post-form.tsx`
- `src/features/posts/components/posts-filters.tsx`
- `src/features/posts/components/posts-list.tsx`
- `src/features/posts/schemas/post.ts`

Removed/migrated:
- `middleware.ts` removed in favor of `proxy.ts`.
- Previous non-localized route files under `src/app/(auth)`, `src/app/(dashboard)`, and root `src/app/page.tsx`, `layout.tsx`, `error.tsx`, `loading.tsx`, `not-found.tsx` were moved under `src/app/[locale]`.

## Validation

Commands run:

- `bun add next-intl`
  - Exit: 0
  - Installed `next-intl@4.12.0`.
- `bunx biome check proxy.ts messages/en.json messages/id.json next.config.ts`
  - Exit: 0 after formatting with `bunx biome check --write ...`.
- `bunx biome check 'src/app/[locale]' src/features/auth src/features/posts/actions src/features/posts/components src/features/posts/schemas src/i18n proxy.ts next.config.ts messages/en.json messages/id.json`
  - Exit: 0.
- `bun run lint`
  - Exit: 1 due to pre-existing/unrelated lint errors outside the i18n scope.
  - No i18n-related files were reported after focused fixes.
  - Remaining files include `src/app/api/posts/[id]/route.ts`, `src/shared/db/seed.ts`, `src/shared/lib/api.ts`, and several `src/shared/ui/*` shadcn-style components.
- `bunx tsc --noEmit --pretty false`
  - Exit: 2 due to existing project type errors.
  - No errors referenced the new i18n files, localized app files, auth feature files, or posts feature files.
- `bun run build`
  - Exit: 1.
  - Compilation succeeded, then TypeScript failed on unrelated existing issue:
    - `src/shared/ui/calendar.tsx:74:9` — `table` does not exist in `Partial<ClassNames>`.

## Left undone / deferred

- API response strings remain English because API routes/user-generated content were explicitly out of scope.
- Dynamic post detail/edit pages are linked but not present in the current app; links are locale-aware but routes still need pages if that feature is required.
- Route slugs are intentionally not translated per approved scope.
- RTL support was not added.
- Full `bun run lint` and `bun run build` require fixing unrelated existing issues outside the approved i18n scope.

## Risks / notes

- The working tree already contained broad unrelated changes before this work. I only changed the i18n/auth/posts files needed for this setup.
- `callbackUrl` handling strips the active locale before calling localized router navigation, so client-side redirects stay within the current locale.
- `proxy.ts` uses a root-relative import (`./src/i18n/routing`) because it lives at project root per Next.js 16 proxy convention, and default-exports the proxy handler per Next/next-intl examples.
