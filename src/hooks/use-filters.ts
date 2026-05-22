"use client";

import { parseAsBoolean, parseAsInteger, parseAsString, useQueryState } from "nuqs";

// ============================================================================
// URL Search Params for Filter Synchronization
// ============================================================================

export function usePostFilters() {
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [published, setPublished] = useQueryState("published", parseAsBoolean);
  const [sortBy, setSortBy] = useQueryState("sortBy", parseAsString.withDefault("createdAt"));
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", parseAsString.withDefault("desc"));

  const resetFilters = () => {
    setSearch("");
    setPage(1);
    setLimit(10);
    setPublished(null);
    setSortBy("createdAt");
    setSortOrder("desc");
  };

  return {
    // Values
    search,
    page,
    limit,
    published,
    sortBy,
    sortOrder,
    // Setters
    setSearch,
    setPage,
    setLimit,
    setPublished,
    setSortBy,
    setSortOrder,
    // Helpers
    resetFilters,
  };
}

export function usePagination() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState("limit", parseAsInteger.withDefault(10));

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const goToPage = (p: number) => setPage(Math.max(1, p));

  return {
    page,
    limit,
    setPage,
    setLimit,
    nextPage,
    prevPage,
    goToPage,
  };
}

export function useSearch() {
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));

  return {
    search,
    setSearch,
    clearSearch: () => setSearch(""),
  };
}
