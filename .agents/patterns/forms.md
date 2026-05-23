# Forms Pattern

## Overview

Forms use React Hook Form with Zod resolver for validation. Server Actions handle submission.

## Pattern

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema, type CreatePostInput } from "@/features/posts/schemas";
import { createPost } from "@/features/posts/actions/post-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export function PostForm() {
  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
      published: false,
      tags: [],
    },
  });

  return (
    <Form {...form}>
      <form
        action={async (formData) => {
          const result = await createPost(formData);
          if (result.error) {
            toast.error(result.error);
          } else {
            form.reset();
          }
        }}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Post</Button>
      </form>
    </Form>
  );
}
```

## Components

| Component | Purpose |
|-----------|---------|
| `Form` | Root wrapper, passes form context |
| `FormField` | Connects react-hook-form field to UI |
| `FormItem` | Layout container for label + input + message |
| `FormLabel` | Label element |
| `FormControl` | Input wrapper (focus management, aria) |
| `FormMessage` | Validation error display |

## Validation

Schema defined in `src/features/*/schemas/`:

```tsx
// src/features/posts/schemas/post.ts
import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().optional(),
  published: z.boolean(),
  tags: z.array(z.string()),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
```

## Key Rules

1. **Schema in feature schemas/** — Never inline validation logic
2. **Export both schema and type** — `z.infer<typeof schema>` for TypeScript
3. **Use zodResolver** — Bridges Zod → React Hook Form
4. **Always show FormMessage** — Users need validation feedback
5. **Server-side validation too** — Client validation is UX, server validation is security

## Key Files

- `src/features/posts/schemas/post.ts` — Post validation schemas
- `src/features/auth/schemas/auth.ts` — Auth validation schemas
- `src/features/posts/components/post-form.tsx` — Form example
- `src/features/posts/components/create-post-dialog.tsx` — Dialog + Form pattern
