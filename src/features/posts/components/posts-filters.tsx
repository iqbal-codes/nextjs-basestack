"use client";

import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePostFilters } from "@/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PostsFilters() {
  const t = useTranslations("Posts.filters");
  const { search, setSearch, published, setPublished } = usePostFilters();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
        {search && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2"
            onClick={() => setSearch("")}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={published === null || published === undefined ? "default" : "outline"}
          size="sm"
          onClick={() => setPublished(null)}
        >
          {t("all")}
        </Button>
        <Button
          variant={published === true ? "default" : "outline"}
          size="sm"
          onClick={() => setPublished(true)}
        >
          {t("published")}
        </Button>
        <Button
          variant={published === false ? "default" : "outline"}
          size="sm"
          onClick={() => setPublished(false)}
        >
          {t("drafts")}
        </Button>
      </div>

      {(search || published !== null) && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{t("label")}</span>
          {search && (
            <Badge variant="secondary" className="gap-1">
              {t("search", { query: search })}
              <button
                type="button"
                onClick={() => setSearch("")}
                className="ml-1 hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {published !== null && (
            <Badge variant="secondary" className="gap-1">
              {published ? t("published") : t("drafts")}
              <button
                type="button"
                onClick={() => setPublished(null)}
                className="ml-1 hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
