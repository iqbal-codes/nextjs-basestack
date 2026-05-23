import { desc, eq, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { Link, redirect } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { auth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations("Dashboard");
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return redirect({ href: "/sign-in", locale });
  }

  const [postsStats, recentPosts] = await Promise.all([
    db
      .select({
        total: sql<number>`count(*)`,
        published: sql<number>`count(case when ${posts.published} then 1 end)`,
      })
      .from(posts)
      .where(eq(posts.authorId, user.id)),
    db.query.posts.findMany({
      where: eq(posts.authorId, user.id),
      orderBy: [desc(posts.createdAt)],
      limit: 5,
    }),
  ]);

  const stats = postsStats[0];
  const dateFormatter = new Intl.DateTimeFormat(locale);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("welcome", { name: user.name })}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("stats.totalPosts")}</CardTitle>
            <span className="text-2xl">📝</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total ?? 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("stats.published")}</CardTitle>
            <span className="text-2xl">✅</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.published ?? 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("stats.drafts")}</CardTitle>
            <span className="text-2xl">📋</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(stats?.total ?? 0) - (stats?.published ?? 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t("recentPosts.title")}</CardTitle>
              <CardDescription>{t("recentPosts.description")}</CardDescription>
            </div>
            <Link href="/posts" className="text-sm text-primary hover:underline">
              {t("recentPosts.viewAll")}
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentPosts.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">{t("recentPosts.empty")}</p>
          ) : (
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {dateFormatter.format(new Date(post.createdAt))}
                    </p>
                  </div>
                  <Badge variant={post.published ? "default" : "secondary"}>
                    {post.published ? t("status.published") : t("status.draft")}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
