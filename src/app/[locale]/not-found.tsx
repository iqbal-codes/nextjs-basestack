import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("Status.notFound");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">{t("title")}</h1>
      <p className="text-xl text-muted-foreground">{t("description")}</p>
      <Button>
        <Link href="/">{t("home")}</Link>
      </Button>
    </div>
  );
}
