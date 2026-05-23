# CONTEXT.md

## Project Overview

**Next.js Basestack** is a production-ready full-stack template built with modern TypeScript tools. It provides a solid foundation for building web applications with authentication, database, and AI chat capabilities.

## Goals

1. **Developer Experience** — Type-safe from database to UI, fast iteration with Biome
2. **Production Ready** — Session-based auth, proper error handling, caching strategies
3. **Scalable Architecture** — Feature-based foldering, clear separation of concerns
4. **Modern Stack** — Next.js 16, React 19, Drizzle ORM, Better Auth

## Domain Model

### Core Entities

| Entity           | Description                   | Relationships                                 |
| ---------------- | ----------------------------- | --------------------------------------------- |
| **User**         | Authenticated user account    | Has many: sessions, accounts, posts, profiles |
| **Session**      | Active authentication session | Belongs to: user                              |
| **Account**      | OAuth provider link           | Belongs to: user                              |
| **Verification** | Email verification token      | Standalone                                    |
| **Post**         | Blog post / content           | Belongs to: user (author)                     |
| **Profile**      | User profile (1:1)            | Belongs to: user                              |

### Business Rules

- Users can only edit/delete their own posts
- Posts can be drafts or published
- Posts have tags (JSON array)
- Sessions expire after 7 days, refresh daily
- Auth routes redirect to dashboard if already logged in
- Protected routes redirect to sign-in if no session

## Tech Decisions

| Decision       | Choice              | Rationale                                               |
| -------------- | ------------------- | ------------------------------------------------------- |
| Database       | SQLite (local file) | Simple setup, no external deps, good for dev/small apps |
| ORM            | Drizzle             | Type-safe, SQL-like, low overhead                       |
| Auth           | Better Auth         | Modern, adapter-based, session-focused                  |
| State (server) | TanStack Query      | Caching, background refetch, mutations                  |
| State (client) | Zustand             | Simple, minimal, SSR-safe                               |
| State (URL)    | nuqs                | Type-safe, shareable, server-parsed                     |
| Linting        | Biome               | Fast, unified linter+formatter                          |
| UI             | shadcn/ui           | Accessible, customizable, compound components           |

## Constraints

- **SQLite only** — No PostgreSQL/MySQL patterns (yet)
- **No testing setup** — No test files or test config present
- **No CI/CD** — No GitHub Actions or deployment config
- **No i18n** — English only
- **No rate limiting** — No API rate limiting configured
- **No logging** — Only console.error in catch blocks

## Out of Scope (Current)

- Multi-tenancy
- Role-based access control (RBAC)
- File uploads / storage
- Email sending (transactional emails)
- Background jobs / queues
- Monitoring / observability
