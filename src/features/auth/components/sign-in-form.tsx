"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getAuthLinkHref,
  getAuthRedirectPath,
} from "@/features/auth/lib/redirect";
import {
  createSignInSchema,
  type SignInInput,
} from "@/features/auth/schemas/auth";
import { Link, useRouter } from "@/i18n/navigation";
import { signIn, useSession } from "@/lib/auth-client";
import { extractError, resolveErrorMessage } from "@/lib/errors";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignInForm({ callbackUrl }: { callbackUrl: string | null }) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Auth");
  const errorT = useTranslations("Errors");
  const { data: session, isPending } = useSession();
  const redirectPath = getAuthRedirectPath(callbackUrl, locale);
  const signUpHref = getAuthLinkHref("/sign-up", callbackUrl);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(
      createSignInSchema({
        invalidEmail: t("validation.invalidEmail"),
        passwordRequired: t("validation.passwordRequired"),
      }),
    ),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!isPending && session) {
      router.push(redirectPath);
    }
  }, [session, isPending, router, redirectPath]);

  const onSubmit = async (data: SignInInput) => {
    const result = await signIn.email({
      email: data.email,
      password: data.password,
    });

    if (result.error) {
      toast.error(resolveErrorMessage(extractError(result.error), errorT));
    } else {
      router.push(redirectPath);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    );
  }

  if (session) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          {t("signIn.title")}
        </CardTitle>
        <CardDescription>{t("signIn.description")}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("fields.email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("placeholders.email")}
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("fields.password")}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t("placeholders.password")}
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-none!">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? t("signIn.submitting") : t("signIn.submit")}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {t("signIn.noAccount")}{" "}
            <Link href={signUpHref} className="text-primary hover:underline">
              {t("signIn.signUpLink")}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
