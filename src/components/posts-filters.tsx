"use client";

import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePostFilters } from "@/hooks";

export function PostsFilters() {
  const { search, setSearch, published, setPublished, resetFilters } = usePostFilters();

  const hasActiveFilters = search || published !== null;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      {/* Search Input */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value || null)}
          className="pl-9"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant={published === true ? "default" : "outline"}
          size="sm"
          onClick={() => setPublished(published === true ? null : true)}
        >
          Published
        </Button>
        <Button
          variant={published === false ? "default" : "outline"}
          size="sm"
          onClick={() => setPublished(published === false ? null : false)}
        >
          Drafts
        </Button>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <X className="mr-1 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filters:</span>
          {search && (
            <Badge variant="secondary" className="gap-1">
              Search: {search}
              <button onClick={() => setSearch(null)} className="ml-1 hover:text-foreground">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {published !== null && (
            <Badge variant="secondary" className="gap-1">
              {published ? "Published" : "Drafts"}
              <button onClick={() => setPublished(null)} className="ml-1 hover:text-foreground">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
