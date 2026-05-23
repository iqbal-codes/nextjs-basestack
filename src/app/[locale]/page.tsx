import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const cardKeys = ["next", "ui", "query", "forms", "auth", "database", "state", "url", "typescript"];

export default async function Home() {
  const t = await getTranslations("Home");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-6 text-center">
          <h1 className="text-5xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-xl text-muted-foreground">{t("description")}</p>
          <div className="flex justify-center gap-4">
            <Button size="lg">
              <Link href="/dashboard">{t("getStarted")}</Link>
            </Button>
            <Button variant="outline" size="lg">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                {t("github")}
              </a>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cardKeys.map((key) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">{t(`cards.${key}.title`)}</CardTitle>
                <CardDescription>{t(`cards.${key}.description`)}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {t.raw(`cards.${key}.items`).map((item: string) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
