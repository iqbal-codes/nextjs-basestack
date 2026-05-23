import { z } from "zod";

// ============================================================================
// Auth Schemas
// ============================================================================

type AuthValidationMessages = {
  invalidEmail: string;
  passwordRequired: string;
  nameRequired: string;
  nameMax: string;
  passwordMin: string;
  passwordMax: string;
  passwordsMatch: string;
};

const defaultAuthValidationMessages: AuthValidationMessages = {
  invalidEmail: "Please enter a valid email address",
  passwordRequired: "Password is required",
  nameRequired: "Name is required",
  nameMax: "Name must be less than 100 characters",
  passwordMin: "Password must be at least 8 characters",
  passwordMax: "Password must be less than 100 characters",
  passwordsMatch: "Passwords don't match",
};

export function createSignInSchema(
  messages: Pick<
    AuthValidationMessages,
    "invalidEmail" | "passwordRequired"
  > = defaultAuthValidationMessages,
) {
  return z.object({
    email: z.string().email(messages.invalidEmail),
    password: z.string().min(1, messages.passwordRequired),
  });
}

export function createSignUpSchema(
  messages: AuthValidationMessages = defaultAuthValidationMessages,
) {
  return z
    .object({
      name: z.string().min(1, messages.nameRequired).max(100, messages.nameMax),
      email: z.string().email(messages.invalidEmail),
      password: z.string().min(8, messages.passwordMin).max(100, messages.passwordMax),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: messages.passwordsMatch,
      path: ["confirmPassword"],
    });
}

export function createForgotPasswordSchema(
  messages: Pick<AuthValidationMessages, "invalidEmail"> = defaultAuthValidationMessages,
) {
  return z.object({
    email: z.string().email(messages.invalidEmail),
  });
}

export function createResetPasswordSchema(
  messages: Pick<
    AuthValidationMessages,
    "passwordMin" | "passwordMax" | "passwordsMatch"
  > = defaultAuthValidationMessages,
) {
  return z
    .object({
      password: z.string().min(8, messages.passwordMin).max(100, messages.passwordMax),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: messages.passwordsMatch,
      path: ["confirmPassword"],
    });
}

export const signInSchema = createSignInSchema();
export const signUpSchema = createSignUpSchema();
export const forgotPasswordSchema = createForgotPasswordSchema();
export const resetPasswordSchema = createResetPasswordSchema();

// ============================================================================
// Types
// ============================================================================

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
