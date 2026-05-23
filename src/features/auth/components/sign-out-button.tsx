"use client";

import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { signOut } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const t = useTranslations("Auth.signOut");
  const [isPending, startTransition] = useTransition();

  const handleSignOut = async () => {
    startTransition(async () => {
      await signOut();
      router.push("/");
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isPending}
      className="w-full rounded-sm text-left text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {isPending ? t("submitting") : t("label")}
    </button>
  );
}
