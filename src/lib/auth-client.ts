"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export const { signIn, signOut, useSession } = authClient;

// Export signUp function (may be under different name in newer versions)
export const signUp = authClient.signUp || authClient.signIn;
