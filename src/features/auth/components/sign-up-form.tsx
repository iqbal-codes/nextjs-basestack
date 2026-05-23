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
  createSignUpSchema,
  type SignUpInput,
} from "@/features/auth/schemas/auth";
import { Link, useRouter } from "@/i18n/navigation";
import { signUp, useSession } from "@/lib/auth-client";
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

export function SignUpForm({ callbackUrl }: { callbackUrl: string | null }) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Auth");
  const errorT = useTranslations("Errors");
  const { data: session, isPending } = useSession();
  const redirectPath = getAuthRedirectPath(callbackUrl, locale);
  const signInHref = getAuthLinkHref("/sign-in", callbackUrl);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(
      createSignUpSchema({
        invalidEmail: t("validation.invalidEmail"),
        passwordRequired: t("validation.passwordRequired"),
        nameRequired: t("validation.nameRequired"),
        nameMax: t("validation.nameMax"),
        passwordMin: t("validation.passwordMin"),
        passwordMax: t("validation.passwordMax"),
        passwordsMatch: t("validation.passwordsMatch"),
      }),
    ),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!isPending && session) {
      router.push(redirectPath);
    }
  }, [session, isPending, router, redirectPath]);

  const onSubmit = async (data: SignUpInput) => {
    const result = await signUp.email({
      name: data.name,
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
          {t("signUp.title")}
        </CardTitle>
        <CardDescription>{t("signUp.description")}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("fields.name")}</Label>
            <Input
              id="name"
              placeholder={t("placeholders.name")}
              {...register("name")}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
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
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              {t("fields.confirmPassword")}
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder={t("placeholders.password")}
              {...register("confirmPassword")}
              aria-invalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-none!">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? t("signUp.submitting") : t("signUp.submit")}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {t("signUp.hasAccount")}{" "}
            <Link href={signInHref} className="text-primary hover:underline">
              {t("signUp.signInLink")}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
