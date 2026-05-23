# Server Components Pattern

## Overview

Next.js App Router uses React Server Components (RSC) by default. Components are Server Components unless marked with `"use client"`.

## Decision Rule

Use Server Component when:
- Fetching data (async/await directly in component)
- Accessing backend resources (DB, file system)
- Keeping sensitive logic server-side (API keys, auth checks)
- Reducing client bundle size

Use Client Component (`"use client"`) when:
- Using hooks (`useState`, `useEffect`, `useReducer`)
- Using browser APIs (`window`, `localStorage`)
- Using event handlers (`onClick`, `onChange`)
- Using custom hooks that depend on client state

## Pattern: Server → Client Handoff

```tsx
// Server Component (default) — data fetching at top
export default async function Page() {
  const data = await fetchData(); // Server-side
  return <ClientComponent data={data} />; // Pass to client
}

// Client Component ("use client") — interactivity
"use client";
export function InteractiveWidget({ data }) {
  const [state, setState] = useState();
  return <div>...</div>;
}
```

## Key Rules

1. **Default to Server Components** — Only add `"use client"` when necessary
2. **Lift client boundary down** — Keep as much as possible on the server
3. **Pass serializable props** — Server → Client props must be JSON-serializable
4. **No mixing** — Server Components can import Client Components, not vice versa

## Common Mistakes

- ❌ Using `useState` in a Server Component → Add `"use client"`
- ❌ Passing functions as props from Server → Client → Use Server Actions instead
- ❌ Fetching data in Client Component → Move to Server Component or API route

## Key Files

- `src/app/layout.tsx` — Root layout (Server Component with Providers)
- `src/app/(dashboard)/dashboard/page.tsx` — Example Server Component page
- `src/features/posts/components/posts-list.tsx` — Example Client Component
