# Local codebase context: adding multi-language i18n

## Current architecture summary

- Framework: Next.js App Router on Next `16.2.6`, React `19.2.4`, TypeScript strict mode, path alias `@/* -> ./src/*`.
  - Evidence: `package.json:25-26`, `tsconfig.json:7`, `tsconfig.json:21-22`.
- User-facing routes live under `src/app` with route groups:
  - `/` from `src/app/page.tsx`
  - `/sign-in`, `/sign-up` from `src/app/(auth)/...`
  - `/dashboard`, `/posts` from `src/app/(dashboard)/...`
  - API routes remain under `/api/auth/[...all]`, `/api/posts`, `/api/posts/[id]`.
  - Evidence: `src/app` file tree inspected; `PRODUCT.md:69-76` documents the same IA.
- Root layout currently owns `<html lang="en">`, global fonts, and app providers.
  - Evidence: `src/app/layout.tsx:7` loads Inter latin subset, `src/app/layout.tsx:19-22` static English metadata, `src/app/layout.tsx:31` hard-codes `lang="en"`, `src/app/layout.tsx:33` renders `<Providers>`.
- There is no existing i18n implementation.
  - Evidence: `CONTEXT.md:52-54` explicitly says no testing setup and no i18n; `package.json` contains no `next-intl`, `i18next`, `react-intl`, etc.; no `messages/`, `locales/`, `i18n/`, or `[locale]` route segment exists.
- Auth boundaries are split between root `middleware.ts` and server-side checks in pages/actions/API routes.
  - Evidence: `middleware.ts:5` protected routes are `"/dashboard", "/posts", "/profile", "/settings"`; `middleware.ts:8` auth routes are `"/sign-in", "/sign-up"`; `middleware.ts:15-17` checks Better Auth cookies; `src/app/(dashboard)/dashboard/page.tsx:12-17` also checks the session and redirects to `/sign-in`.
- Client providers are centralized in `src/shared/lib/providers.tsx`.
  - Evidence: `src/shared/lib/providers.tsx:48-51` wraps the app in TanStack Query, `NuqsAdapter`, and React Query Devtools.

## External i18n facts worth carrying forward

If the implementation chooses `next-intl` (likely the lowest-friction App Router option), current docs describe:

- App Router setup with `messages/{locale}.json`, `src/i18n/request.ts`, and `next.config.ts` plugin wiring. Source: https://next-intl.dev/docs/getting-started/app-router
- Locale routing via middleware using `createMiddleware(routing)` and a matcher that excludes API, `_next`, `_vercel`, and files with dots. Source: https://next-intl.dev/docs/routing/middleware
- Shared routing config via `defineRouting` and navigation wrappers via `createNavigation`, useful for locale-aware `Link`, `redirect`, and router APIs. Sources: https://next-intl.dev/docs/routing/setup and https://next-intl.dev/docs/routing/navigation

This is research context only; verify package compatibility before editing because the project is on Next 16.

## Exact relevant files and why they matter

### Config, dependencies, validation

- `package.json`
  - `package.json:5-12`: scripts are `dev`, `build`, `lint`, `lint:fix`, `format`, DB scripts. No test script.
  - `package.json:19-47`: dependencies include Next/React, Better Auth, TanStack Query, nuqs, zod, react-hook-form; no i18n library.
- `next.config.ts`
  - `next.config.ts:3-7`: empty config object. If using `next-intl`, this is where its plugin would be composed.
- `tsconfig.json`
  - `tsconfig.json:7`: `strict` true.
  - `tsconfig.json:21-22`: alias `@/*` maps to `./src/*`.
- `biome.json`
  - `biome.json:13-15`: 2-space indent, 100-char line width.
  - `biome.json:35-37`: double quotes and semicolons.
- `components.json`
  - `components.json:4`: shadcn configured for RSC.
  - `components.json:14`: `rtl` currently false; relevant if Arabic/Hebrew/Persian/Urdu/etc. are in scope.

### Layouts, routes, and hard-coded navigation

- `src/app/layout.tsx`
  - Root metadata is English at `src/app/layout.tsx:19-22`.
  - `<html lang="en">` is hard-coded at `src/app/layout.tsx:31`.
  - Providers are applied at `src/app/layout.tsx:33`.
  - Fonts request latin subsets at `src/app/layout.tsx:7`, `src/app/layout.tsx:9-16`; verify subsets if target languages require non-latin glyphs.
- `src/app/page.tsx`
  - Landing page is a Server Component with all marketing copy hard-coded.
  - Key hard-coded text/links: title at `src/app/page.tsx:11`, `/dashboard` CTA at `src/app/page.tsx:17`, external GitHub link at `src/app/page.tsx:20-21`, many `CardTitle`, `CardDescription`, and `<li>` strings starting around `src/app/page.tsx:31`.
- `src/app/(auth)/layout.tsx`
  - Static metadata at `src/app/(auth)/layout.tsx:3-5`.
- `src/app/(auth)/sign-in/page.tsx`
  - Client Component (`src/app/(auth)/sign-in/page.tsx:1`).
  - Uses Better Auth client session (`src/app/(auth)/sign-in/page.tsx:19`, `:24`).
  - Redirects are hard-coded to `/dashboard` (`src/app/(auth)/sign-in/page.tsx:40`, `:56`).
  - UI/error copy is hard-coded: title/description at `src/app/(auth)/sign-in/page.tsx:75-76`, labels/placeholders at `:81-96`, server fallback error at `:52`, button text at `:107`, sign-up link at `:112-114`.
- `src/app/(auth)/sign-up/page.tsx`
  - Client Component (`src/app/(auth)/sign-up/page.tsx:1`).
  - Uses Better Auth client session (`src/app/(auth)/sign-up/page.tsx:19`, `:24`).
  - Redirects are hard-coded to `/dashboard` (`src/app/(auth)/sign-up/page.tsx:42`, `:59`).
  - UI/error copy is hard-coded: title/description around `src/app/(auth)/sign-up/page.tsx:78-79`, labels/placeholders for name/email/password/confirm password around `:84-128`, button text at `:139`, sign-in link around `:144-146`.
- `src/app/(dashboard)/layout.tsx`
  - Static metadata at `src/app/(dashboard)/layout.tsx:14-17`.
  - Hard-coded internal links: `/dashboard` at `:29`, `/profile` at `:63`, `/settings` at `:68`; nav text and brand are hard-coded.
  - Renders `SignOutButton` at `:74` and content at `:83`.
- `src/app/(dashboard)/dashboard/page.tsx`
  - Server Component with session check and DB fetch.
  - Redirects unauthenticated users to `/sign-in` at `src/app/(dashboard)/dashboard/page.tsx:17`.
  - UI copy is hard-coded: `Dashboard`/welcome at `:41-42`, stats labels at `:49`, `:59`, `:69`, recent-post labels and empty states around `:89-101`.
  - Dates use ambient `toLocaleDateString()` at `:109`; should become locale-aware.
- `src/app/(dashboard)/posts/page.tsx`
  - Client Component (`src/app/(dashboard)/posts/page.tsx:1`).
  - Hard-coded page title/description at `src/app/(dashboard)/posts/page.tsx:15-16`, CTA at `:21`, Suspense fallbacks at `:27` and `:31`.
- `src/app/error.tsx`
  - Client error boundary with hard-coded copy at `src/app/error.tsx:19-21`.
- `src/app/not-found.tsx`
  - Hard-coded `404`, page text, and root `/` link at `src/app/not-found.tsx:7-10`.
- `src/app/loading.tsx`
  - No textual copy; likely unaffected.

### Middleware and auth-boundary files

- `middleware.ts`
  - Current matcher excludes `api`, `_next/static`, `_next/image`, and `favicon.ico` at `middleware.ts:38-41`.
  - Current route matching will not protect locale-prefixed paths such as `/en/dashboard` because it checks raw `pathname.startsWith('/dashboard')` (`middleware.ts:19`, `:24`).
  - Auth redirects are hard-coded to `/sign-in` and `/dashboard` (`middleware.ts:25`, `:32`).
  - `callbackUrl` currently stores only `pathname` (`middleware.ts:26`), not query string. Locale-prefixed protected routes with filters could lose search params unless fixed.
- `src/shared/lib/auth.ts`
  - Better Auth server config; no locale-specific fields or callbacks.
- `src/shared/lib/auth-client.ts`
  - Better Auth client; `baseURL` from `NEXT_PUBLIC_APP_URL`. Locale routing should not require changing this unless using domain-based locale routing.
- `src/features/auth/components/sign-out-button.tsx`
  - Client signout redirects hard-coded to `/` at `src/features/auth/components/sign-out-button.tsx:14`.
  - Text hard-coded at `src/features/auth/components/sign-out-button.tsx:25`.
- `src/features/auth/actions/auth-actions.ts`
  - Server actions return English error strings and redirect `/` on signout. If still used, localize or keep API/action errors as stable codes.

### Posts feature and URL state

- `src/shared/hooks/use-filters.ts`
  - nuqs manages `search`, `page`, `limit`, `published` query params (`src/shared/hooks/use-filters.ts:5-9`). Locale path changes should preserve these query params.
- `src/shared/lib/api.ts`
  - Fetches relative `/api/posts` and `/api/posts/{id}` paths (`src/shared/lib/api.ts:23`, `:34`); should remain unlocalized API URLs.
  - Error strings are English (`src/shared/lib/api.ts:25`, `:36`, `:45`, `:54`).
- `src/features/posts/components/posts-filters.tsx`
  - Client Component with hard-coded placeholders/filter labels: `Search posts...` at `:18`, `All` at `:42`, `Published` at `:49`, `Drafts` at `:56`, active filter labels around `:63-77`.
- `src/features/posts/components/posts-list.tsx`
  - Client Component with hard-coded confirm/error/empty/table/action/pagination copy.
  - Confirm at `src/features/posts/components/posts-list.tsx:41`.
  - Error at `:68`; empty state at `:84`; title/total at `:94-95`; table headers/actions/pagination around `:100-169`.
  - Dates use ambient `toLocaleDateString()` at `:128`; should become locale-aware.
  - Links to `/posts/${post.id}` and `/posts/${post.id}/edit` at `:119`, `:141`, `:147`, but this codebase currently has no `src/app/(dashboard)/posts/[id]` or edit page. Do not create localized dynamic pages unless that missing route is part of scope.
- `src/features/posts/components/create-post-dialog.tsx`
  - Hard-coded dialog title/description at `src/features/posts/components/create-post-dialog.tsx:57-60`.
  - Throws hard-coded error at `:45`.
- `src/features/posts/components/post-form.tsx`
  - Client form labels/placeholders/buttons are hard-coded at `src/features/posts/components/post-form.tsx:36`, `:38`, `:50`, `:53`, `:68`, `:71`, `:91`, `:98`.
- `src/features/posts/schemas/post.ts`
  - Zod validation messages are English at `src/features/posts/schemas/post.ts:8`, `:15`, `:18-19`.
- `src/features/auth/schemas/auth.ts`
  - Zod validation messages are English at `src/features/auth/schemas/auth.ts:8-9`, `:14-23`, `:28`, `:36-40`.

### API routes

- `src/app/api/auth/[...all]/route.ts`
  - Better Auth handler; should stay outside locale routing.
- `src/app/api/posts/route.ts`
  - Query params are unlocalized (`page`, `limit`, `search`, `authorId`, `published`) at `src/app/api/posts/route.ts:11-17`.
  - API JSON errors are English (`Unauthorized`, `Failed to fetch/create posts`) at `src/app/api/posts/route.ts:52`, `:65`, `:83`.
- `src/app/api/posts/[id]/route.ts`
  - API JSON errors are English (`Post not found`, `Unauthorized`, `Forbidden`, etc.) at `src/app/api/posts/[id]/route.ts:18`, `:24`, `:36`, `:46`, `:50`, `:79`.
  - Usually leave API route paths unlocalized; decide separately whether API error payloads should be translated or remain stable English/error codes.

## Recommended integration points

1. **Routing shape**
   - Prefer locale-prefixed App Router URLs such as `/en`, `/en/sign-in`, `/en/dashboard`, `/en/posts` for a proper multi-language app.
   - With `next-intl`, add a shared routing config (commonly `src/i18n/routing.ts`) and request config (commonly `src/i18n/request.ts`), then update `next.config.ts` with the library plugin.
   - Move or wrap user-facing routes under a locale segment (`src/app/[locale]/...`) while keeping `src/app/api/...` outside localization.
   - Decide what `/` should do: redirect to detected/default locale, or render default locale without prefix.
2. **Root/layout/provider placement**
   - Locale must reach `<html lang>`; current `src/app/layout.tsx:31` is fixed to English.
   - If using a top-level `[locale]` root layout, transfer root layout responsibilities there: fonts, `<Providers>`, and localized metadata. Keep `globals.css` import valid.
   - Add i18n provider/message loading around the existing `Providers` boundary. Since many translatable components are client components, they need client-accessible messages.
3. **Middleware composition**
   - Compose locale middleware with the current auth cookie guard instead of replacing auth protection.
   - Update protected/auth route checks to handle locale prefixes, e.g. strip `/en` before comparing with `/dashboard` and `/sign-in`, or use localized route helpers.
   - Keep API routes excluded from middleware i18n/auth matching.
   - Redirect unauthenticated `/en/posts?search=x` to `/en/sign-in?callbackUrl=/en/posts?search=x` if preserving callback is desired.
4. **Navigation APIs**
   - Replace direct `next/link`, `next/navigation` redirects/router pushes for user-facing routes with locale-aware helpers or centralized route builders.
   - High-priority hard-coded routes: `/`, `/dashboard`, `/posts`, `/sign-in`, `/sign-up`, `/profile`, `/settings`, post detail/edit links, `revalidatePath('/posts')` and `revalidatePath('/posts/${id}')`.
5. **Translation extraction**
   - Extract application chrome and UI copy from app pages, layouts, feature components, error/not-found boundaries, and form validation schemas.
   - Do not translate user-generated post `title`, `content`, or `tags` unless product scope requires localized content storage.
6. **Validation messages**
   - Avoid using React hooks directly in shared Zod schema modules. Use schema factory functions that accept a translator, localized `zodResolver` setup, or a Zod error map strategy.
   - Server actions/API routes should not rely on English strings for program flow; prefer error codes plus localized UI rendering if scope includes action/API error localization.
7. **Dates, numbers, pluralization**
   - Replace ambient `new Date(...).toLocaleDateString()` with locale-aware formatting using the active locale.
   - Localize count strings such as `{total} total posts`, `Page {page} of {totalPages}`, and tag overflow `+N` only as appropriate.
8. **RTL and fonts**
   - If supporting RTL languages, update layout direction (`dir`) and review `components.json:14` (`rtl: false`) plus Tailwind classes that assume left/right (`mr-*`, `ml-*`, `left-*`, `right-*`).
   - Verify font subsets/glyph support beyond latin if target locales require it.

## Constraints and risks

- **No tests currently**: `CONTEXT.md:52`; `package.json` has no test script. Validation is mostly lint/build/manual smoke.
- **Middleware is fragile under locale prefixes**: current `startsWith('/dashboard')` checks will miss `/en/dashboard`.
- **Auth redirects ignore locale and callback**: sign-in/sign-up pages and middleware redirect to hard-coded `/dashboard`, `/sign-in`, `/`, and do not consume `callbackUrl` in the auth pages.
- **Many Client Components**: sign-in/up, posts page, posts filters/list/forms, sign-out need client translation APIs/providers.
- **Static metadata**: root/auth/dashboard metadata is English and must become generated per locale if SEO/i18n metadata is in scope.
- **Unimplemented linked routes**: UI links to `/posts/[id]`, `/posts/[id]/edit`, `/profile`, `/settings`, but corresponding pages are absent. Localized routing should not make these appear implemented.
- **API errors vs UI copy**: API routes return English strings. Decide whether to leave API errors as developer-facing/stable or localize responses based on `Accept-Language`/locale.
- **User content is not localized**: posts are single title/content/tags fields. Translating UI does not make stored content multilingual.
- **RTL may be non-trivial**: current UI uses physical left/right utilities (`mr-`, `ml-`, `left-`, `right-`) in several components.
- **External package choice unconfirmed**: `next-intl` is a strong fit, but the implementation should verify latest compatibility with Next 16 before installation.

## Suggested validation commands

Run from repo root after implementation:

```bash
bun run lint
bun run build
```

Manual smoke checks because no automated tests exist:

- Visiting `/` redirects/renders according to the chosen default-locale policy.
- Locale-prefixed public pages render translated copy, e.g. `/en`, `/es`.
- Unauthenticated protected routes redirect to locale-matching sign-in, e.g. `/es/dashboard -> /es/sign-in?...`.
- Authenticated users visiting locale-matching auth pages redirect to locale-matching dashboard.
- Header/nav links preserve the active locale.
- Sign in/up validation messages use the active locale.
- Posts filters preserve query params across locale-aware navigation.
- API routes still work at `/api/auth/...` and `/api/posts` and are not locale-prefixed.
- `html lang` and, if relevant, `dir` reflect the active locale.

## Clarifying questions before implementation

1. Which locales are required, and what is the default locale?
2. Should URLs always be locale-prefixed (`/en/dashboard`) or should the default locale be unprefixed (`/dashboard`) while other locales are prefixed?
3. Should `/` redirect to the detected locale, default locale, or render the default locale in place?
4. Should locale detection use `Accept-Language`, a cookie, explicit URL prefix only, or a combination?
5. Is `next-intl` approved as a new dependency, or should the implementation avoid adding a library?
6. Are route pathnames themselves translated (e.g. `/es/publicaciones`) or only page content while route slugs stay English?
7. Should auth callbacks return users to their original localized protected URL after sign-in?
8. Are RTL languages in scope now? If yes, which ones?
9. Should validation/server/action/API error messages be localized, or only rendered UI copy?
10. Should user-generated post content become multilingual in the database, or is this task limited to app chrome/static UI?
