"use client";

import { useMemo } from "react";

type Props = {
  totalCount: number;
  currentPage: number;
};

type Item = {
  type: "previous" | "next" | "page";
  page: number;
  disabled: boolean;
  selected: boolean;
};

export const usePaginationx = ({ totalCount, currentPage }: Props) => {
  return useMemo(() => {
    if (currentPage < 1 || currentPage > totalCount) {
      return [];
    }

    const start = Math.floor((currentPage - 1) / 5) * 5 + 1;
    const end = Math.min(start + 4, totalCount);

    const prevItem: Item = {
      type: "previous",
      page: currentPage - 1,
      disabled: currentPage <= 1,
      selected: false,
    };
    const pageItems: Array<Item> = Array.from({ length: end - start + 1 }, (_, i) => ({
      type: "page",
      page: start + i,
      disabled: false,
      selected: start + i === currentPage,
    }));
    const nextItem: Item = {
      type: "next",
      page: currentPage + 1,
      disabled: currentPage >= totalCount,
      selected: false,
    };

    return [prevItem, ...pageItems, nextItem];
  }, [totalCount, currentPage]);
};
