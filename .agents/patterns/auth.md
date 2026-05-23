# Auth Pattern

## Overview

Uses Better Auth with Drizzle adapter for session-based authentication. Server and client are separated.

## Server-Side Auth

```tsx
// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verification,
    },
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  emailAndPassword: {
    enabled: true,
  },
});

export type Session = typeof auth.$Infer.Session;
```

## Client-Side Auth

```tsx
// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

export const { signIn, signUp, signOut, useSession } = authClient;
```

## Checking Auth in Server Actions

```tsx
"use server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function protectedAction() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  // session.user.id, session.user.email, etc.
}
```

## Middleware Protection

```tsx
// middleware.ts
const protectedRoutes = ["/dashboard", "/posts", "/profile", "/settings"];
const authRoutes = ["/sign-in", "/sign-up"];

export function middleware(request: NextRequest) {
  const sessionCookie =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  if (protectedRoutes.some(r => request.nextUrl.pathname.startsWith(r)) && !sessionCookie) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (authRoutes.some(r => request.nextUrl.pathname.startsWith(r)) && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}
```

## Session Management

- **7-day expiry** — Sessions expire after 7 days
- **1-day refresh** — Session token refreshes every 24 hours
- **Cookie-based** — `better-auth.session_token` or `__Secure-better-auth.session_token`

## Key Rules

1. **Always check auth in Server Actions** — First thing, before any DB operation
2. **Check ownership for mutations** — Verify `authorId === session.user.id`
3. **Use middleware for route protection** — Cookie check, not full validation
4. **Never expose session tokens** — Keep in httpOnly cookies

## Key Files

- `src/lib/auth.ts` — Server auth config
- `src/lib/auth-client.ts` — Client auth exports
- `middleware.ts` — Route protection
- `src/features/auth/actions/auth-actions.ts` — signIn, signUp, signOut actions
