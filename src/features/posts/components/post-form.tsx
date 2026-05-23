"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import {
  type CreatePostInput,
  createCreatePostSchema,
} from "@/features/posts/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PostFormProps {
  onSubmit: (data: CreatePostInput) => Promise<void>;
  initialData?: Partial<CreatePostInput>;
  isLoading?: boolean;
}

export function PostForm({ onSubmit, initialData, isLoading }: PostFormProps) {
  const t = useTranslations("Posts");
  const form = useForm<CreatePostInput>({
    resolver: zodResolver(
      createCreatePostSchema({
        titleRequired: t("validation.titleRequired"),
        titleMax: t("validation.titleMax"),
      }),
    ),
    defaultValues: {
      title: initialData?.title ?? "",
      content: initialData?.content ?? "",
      published: initialData?.published ?? false,
      tags: initialData?.tags ?? [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.title")}</FormLabel>
              <FormControl>
                <Input placeholder={t("form.titlePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.content")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("form.contentPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.tags")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("form.tagsPlaceholder")}
                  value={field.value?.join(", ") ?? ""}
                  onChange={(e) => {
                    const tags = e.target.value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean);
                    field.onChange(tags);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </FormControl>
              <FormLabel className="font-normal">
                {t("form.publishImmediately")}
              </FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? t("form.saving") : t("form.save")}
        </Button>
      </form>
    </Form>
  );
}
