"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { signInSchema, signUpSchema } from "@/schemas";

// ============================================================================
// Auth Server Actions
// ============================================================================

export async function signIn(prevState: unknown, formData: FormData): Promise<{ error?: string }> {
  try {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validatedData = signInSchema.parse(rawData);

    const result = await auth.api.signInEmail({
      body: {
        email: validatedData.email,
        password: validatedData.password,
      },
    });

    // Better Auth returns token on success, no error property on success
    if (result.token) {
      redirect("/dashboard");
    }

    return { error: "Invalid credentials" };
  } catch (error) {
    console.error("Sign in error:", error);
    return { error: "Failed to sign in" };
  }
}

export async function signUp(prevState: unknown, formData: FormData): Promise<{ error?: string }> {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const validatedData = signUpSchema.parse(rawData);

    const result = await auth.api.signUpEmail({
      body: {
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password,
      },
    });

    // Better Auth returns user on success
    if (result.user) {
      redirect("/dashboard");
    }

    return { error: "Failed to create account" };
  } catch (error) {
    console.error("Sign up error:", error);
    return { error: "Failed to create account" };
  }
}

export async function signOut(): Promise<void> {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/");
}

export async function getSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch {
    return null;
  }
}
