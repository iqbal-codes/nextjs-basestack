# Server Actions Pattern

## Overview

Server Actions are async functions marked with `"use server"` that run on the server. They handle mutations (create, update, delete) and are called from Client Components.

## Pattern

```tsx
"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { auth } from "@/lib/auth";
import { createPostSchema } from "@/features/posts/schemas";

type ServerActionResponse<T> =
  | { data: T; error?: undefined; message?: undefined }
  | { data?: undefined; error: string; message?: undefined }
  | { data?: undefined; error?: undefined; message: string };

export async function createPost(
  formData: FormData,
): Promise<ServerActionResponse<{ id: string }>> {
  try {
    // 1. Validate authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { error: "Unauthorized" };
    }

    // 2. Parse and validate form data
    const rawData = {
      title: formData.get("title") as string,
      content: (formData.get("content") as string) || undefined,
      published: formData.get("published") === "true",
      tags: JSON.parse((formData.get("tags") as string) || "[]"),
    };

    const validatedData = createPostSchema.parse(rawData);

    // 3. Database operations
    const [post] = await db
      .insert(posts)
      .values({ ...validatedData, authorId: session.user.id })
      .returning({ id: posts.id });

    // 4. Revalidate cache
    revalidatePath("/posts");

    return { data: { id: post.id } };
  } catch (error) {
    console.error("Create post error:", error);
    return { error: "Failed to create post" };
  }
}
```

## Steps (Always Follow This Order)

1. **Validate auth** — `auth.api.getSession({ headers: await headers() })`
2. **Parse + validate input** — Zod schema `.parse(rawData)`
3. **Check ownership** (for updates/deletes) — Query existing + compare `authorId`
4. **Database operations** — Drizzle queries
5. **Cache invalidation** — `revalidatePath()` for affected routes
6. **Return typed response** — `ServerActionResponse<T>` discriminated union

## Response Type

```tsx
type ServerActionResponse<T> =
  | { data: T; error?: undefined; message?: undefined }
  | { data?: undefined; error: string; message?: undefined }
  | { data?: undefined; error?: undefined; message: string };
```

Always return exactly one variant. Never return both `data` and `error`.

## Client-Side Usage

```tsx
<form action={async (formData) => {
  const result = await createPost(formData);
  if (result.error) {
    toast.error(result.error);
  } else {
    form.reset();
    router.refresh(); // Trigger re-render to pick up revalidated data
  }
}}>
```

## Key Rules

1. **Always validate auth first** — Every action requires session check
2. **Always validate with Zod** — Never trust client input
3. **Always revalidatePath** — After mutations that affect cached data
4. **Always return ServerActionResponse** — Consistent error handling
5. **Never expose internal errors** — Return generic error messages

## Key Files

- `src/features/posts/actions/post-actions.ts` — Full CRUD example
- `src/features/auth/actions/auth-actions.ts` — Auth actions
- `src/types/server-action.ts` — Response type definition
