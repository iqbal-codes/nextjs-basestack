"use client";

import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useDeletePost, usePosts } from "@/features/posts/hooks/use-posts";
import { Link } from "@/i18n/navigation";
import { usePagination, usePostFilters } from "@/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function PostsList() {
  const t = useTranslations("Posts.list");
  const statusT = useTranslations("Dashboard.status");
  const locale = useLocale();
  const { search, page, limit, published } = usePostFilters();
  const { nextPage, prevPage } = usePagination();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading, error } = usePosts({
    search,
    page,
    limit,
    published: published ?? undefined,
  });

  const deleteMutation = useDeletePost();

  const handleDelete = async (id: string) => {
    if (confirm(t("confirmDelete"))) {
      setDeletingId(id);
      try {
        await deleteMutation.mutateAsync(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center text-destructive">
            <p>{t("loadError")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const posts = data?.posts ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / limit);
  const dateFormatter = new Intl.DateTimeFormat(locale);

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <p className="text-muted-foreground">{t("empty")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("total", { count: total })}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("columns.title")}</TableHead>
              <TableHead>{t("columns.status")}</TableHead>
              <TableHead>{t("columns.tags")}</TableHead>
              <TableHead>{t("columns.created")}</TableHead>
              <TableHead className="w-[70px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <Link href={`/posts/${post.id}`} className="font-medium hover:underline">
                    {post.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant={post.published ? "default" : "secondary"}>
                    {post.published ? statusT("published") : statusT("draft")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {post.tags?.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {(post.tags?.length ?? 0) > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{(post.tags?.length ?? 0) - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{dateFormatter.format(new Date(post.createdAt))}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link href={`/posts/${post.id}`} className="flex w-full items-center">
                          <Eye className="mr-2 h-4 w-4" />
                          {t("view")}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/posts/${post.id}/edit`} className="flex w-full items-center">
                          <Pencil className="mr-2 h-4 w-4" />
                          {t("edit")}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {deletingId === post.id ? t("deleting") : t("delete")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{t("pageOf", { page, totalPages })}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={prevPage} disabled={page <= 1}>
                {t("previous")}
              </Button>
              <Button variant="outline" size="sm" onClick={nextPage} disabled={page >= totalPages}>
                {t("next")}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
