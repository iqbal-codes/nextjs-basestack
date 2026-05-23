import { Plus } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { CreatePostDialog } from "@/features/posts/components/create-post-dialog";
import { PostsFilters } from "@/features/posts/components/posts-filters";
import { PostsList } from "@/features/posts/components/posts-list";
import { Button } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Posts.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PostsPage() {
  const t = await getTranslations("Posts");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
        <CreatePostDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t("newPost")}
          </Button>
        </CreatePostDialog>
      </div>

      <Suspense fallback={<div>{t("loadingFilters")}</div>}>
        <PostsFilters />
      </Suspense>

      <Suspense fallback={<div>{t("loadingPosts")}</div>}>
        <PostsList />
      </Suspense>
    </div>
  );
}
