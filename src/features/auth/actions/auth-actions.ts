"use server";

import { headers } from "next/headers";
import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";

export async function signIn(formData: { email: string; password: string }) {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email: formData.email,
        password: formData.password,
      },
    });

    return { data: result };
  } catch (error) {
    console.error("Sign in error:", error);
    return { error: "Invalid email or password" };
  }
}

export async function signUp(formData: { name: string; email: string; password: string }) {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
    });

    return { data: result };
  } catch (error) {
    console.error("Sign up error:", error);
    return { error: "Failed to create account" };
  }
}

export async function signOut() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session) {
      await auth.api.signOut({
        headers: await headers(),
      });
    }
  } catch (error) {
    console.error("Sign out error:", error);
  }

  redirect({ href: "/", locale: await getLocale() });
}

export async function getSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return { data: session };
  } catch (error) {
    console.error("Get session error:", error);
    return { error: "Failed to get session" };
  }
}
