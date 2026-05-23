"use client";

import { parseAsBoolean, parseAsInteger, parseAsString, useQueryState } from "nuqs";

export function usePostFilters() {
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [published, setPublished] = useQueryState("published", parseAsBoolean);

  return {
    search,
    setSearch,
    page,
    setPage,
    limit,
    published,
    setPublished,
  };
}

export function usePagination() {
  const { page, setPage, limit } = usePostFilters();

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const goToPage = (p: number) => setPage(p);

  return {
    page,
    limit,
    nextPage,
    prevPage,
    goToPage,
  };
}

export function useSearch() {
  const { search, setSearch } = usePostFilters();

  return {
    search,
    setSearch,
  };
}
