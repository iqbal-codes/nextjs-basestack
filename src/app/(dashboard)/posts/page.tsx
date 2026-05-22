"use client";

import { Plus } from "lucide-react";
import { Suspense } from "react";
import { CreatePostDialog } from "@/components/create-post-dialog";
import { PostsFilters } from "@/components/posts-filters";
import { PostsList } from "@/components/posts-list";
import { Button } from "@/components/ui/button";

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-muted-foreground">Manage your content and blog posts</p>
        </div>
        <CreatePostDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </CreatePostDialog>
      </div>

      <Suspense fallback={<div>Loading filters...</div>}>
        <PostsFilters />
      </Suspense>

      <Suspense fallback={<div>Loading posts...</div>}>
        <PostsList />
      </Suspense>
    </div>
  );
}
