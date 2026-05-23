# AGENTS.md

# Mindset — Behavioral Guidelines

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

## Project Context

| File                     | Purpose                                        | Read When                            |
| ------------------------ | ---------------------------------------------- | ------------------------------------ |
| [CONTEXT.md](CONTEXT.md) | Project overview, domain model, tech decisions | Understanding goals and architecture |
| [DESIGN.md](DESIGN.md)   | Design tokens, component patterns, layouts     | Building/modifying UI                |
| [PRODUCT.md](PRODUCT.md) | Vision, features, user flows, limitations      | Understanding scope                  |

## Detailed Guides (`.agents/`)

### Patterns

| Pattern                       | File                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------ |
| Data flow & state management  | [.agents/patterns/data-flow.md](.agents/patterns/data-flow.md)                 |
| Server vs Client Components   | [.agents/patterns/server-components.md](.agents/patterns/server-components.md) |
| Server Actions                | [.agents/patterns/server-actions.md](.agents/patterns/server-actions.md)       |
| Forms (react-hook-form + Zod) | [.agents/patterns/forms.md](.agents/patterns/forms.md)                         |
| Auth (Better Auth)            | [.agents/patterns/auth.md](.agents/patterns/auth.md)                           |
| UI Components (shadcn/ui)     | [.agents/patterns/ui-components.md](.agents/patterns/ui-components.md)         |

### Standards

| Standard                   | File                                                               |
| -------------------------- | ------------------------------------------------------------------ |
| Naming conventions         | [.agents/standards/naming.md](.agents/standards/naming.md)         |
| Biome (linting/formatting) | [.agents/standards/biome.md](.agents/standards/biome.md)           |
| TypeScript                 | [.agents/standards/typescript.md](.agents/standards/typescript.md) |

### Guardrails

| Guardrail                  | File                                                     |
| -------------------------- | -------------------------------------------------------- |
| DO — things to always do   | [.agents/guardrails/do.md](.agents/guardrails/do.md)     |
| DON'T — things to never do | [.agents/guardrails/dont.md](.agents/guardrails/dont.md) |

### Workflows

| Workflow                        | File                                                             |
| ------------------------------- | ---------------------------------------------------------------- |
| Subagents (delegation patterns) | [.agents/workflows/subagents.md](.agents/workflows/subagents.md) |

---

## Quick Reference

### Tech Stack

| Layer      | Technology                                            |
| ---------- | ----------------------------------------------------- |
| Framework  | Next.js 16 (App Router)                               |
| UI         | React 19, shadcn/ui, Tailwind CSS v4                  |
| Database   | SQLite + Drizzle ORM                                  |
| Auth       | Better Auth                                           |
| State      | TanStack Query (server), Zustand (client), nuqs (URL) |
| Validation | Zod + React Hook Form                                 |
| Linting    | Biome                                                 |

### Import Paths

```tsx
import { Button } from "@/components/ui/button"; // shadcn/ui components
import { db } from "@/db"; // Database
import { auth } from "@/lib/auth"; // Shared lib
import { usePosts } from "@/features/posts/hooks"; // Feature hooks
import { PostsList } from "@/features/posts"; // Feature barrel
```

### Scripts

```bash
bun run dev          # Start dev server
bun run build        # Production build
bun run lint:fix     # Fix lint issues
bun run db:push      # Push schema to DB
```
