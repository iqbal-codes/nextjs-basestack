"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { createPost } from "@/features/posts/actions/post-actions";
import type { CreatePostInput } from "@/features/posts/schemas";
import { useRouter } from "@/i18n/navigation";
import { extractError, resolveErrorMessage } from "@/lib/errors";
import { toast } from "@/lib/toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PostForm } from "./post-form";

interface CreatePostDialogProps {
  children: React.ReactNode;
}

export function CreatePostDialog({ children }: CreatePostDialogProps) {
  const router = useRouter();
  const t = useTranslations("Posts.dialog");
  const errorT = useTranslations("Errors");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreatePostInput) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.set("title", data.title);
      if (data.content) formData.set("content", data.content);
      formData.set("published", String(data.published));
      formData.set("tags", JSON.stringify(data.tags));

      const result = await createPost(formData);

      if (result.error) {
        toast.error(resolveErrorMessage(extractError(result.error), errorT));
        return;
      }

      setOpen(false);
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children as React.ReactElement} />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <PostForm onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}
