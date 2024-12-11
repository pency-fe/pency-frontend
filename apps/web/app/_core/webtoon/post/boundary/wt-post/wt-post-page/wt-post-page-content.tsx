"use client";

import { createContext, useContext, useMemo } from "react";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import { useSuspenseQuery, UseSuspenseQueryResult } from "@tanstack/react-query";
import { Grid, PaginationItem } from "@mui/material";
import { usePaginationx } from "@pency/ui/hooks";
import { createQueryString, withAsyncBoundary } from "@pency/util";
import { wtPostKeys } from "_core/webtoon/post/query";
import { WT_Post_RichCard } from "_core/webtoon/post/ui";
import { useTabData } from "./wt-post-page-tab";
import { useOrderData } from "./wt-post-page-order";
import { useFilterData } from "./wt-post-page-filter";

// ----------------------------------------------------------------------

const ContentDataContext = createContext<
  | UseSuspenseQueryResult<
      Awaited<ReturnType<Exclude<ReturnType<typeof wtPostKeys.list>["queryFn"], undefined>>>
    >["data"]
  | undefined
>(undefined);

function useContentData() {
  const context = useContext(ContentDataContext);

  if (!context) throw new Error(`부모로 <ContentProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
}

const ContentProvider = withAsyncBoundary(
  ({ children }: { children?: React.ReactNode }) => {
    const { genre } = useTabData();
    const { sort } = useOrderData();
    const { creationTypes, pairs } = useFilterData();
    const searchParams = useSearchParams();

    const page = useMemo(() => {
      const param = Number(searchParams.get("page"));
      if (param && !isNaN(param) && param >= 1) {
        return param;
      }
      return 1;
    }, [searchParams]);

    const { data } = useSuspenseQuery(wtPostKeys.list({ genre, sort, page, creationTypes, pairs }));

    return <ContentDataContext.Provider value={data}>{children}</ContentDataContext.Provider>;
  },
  {
    suspense: { fallback: <Loading /> },
    errorBoundary: {
      fallback: <Loading />,
    },
  },
);

// ----------------------------------------------------------------------

function Loading() {
  return (
    <Grid container spacing={1}>
      {Array.from({ length: 18 }, (_, i) => (
        <Grid item key={i} xs={12} sm={6} md={4} sx={{ mb: 1.5 }}>
          <WT_Post_RichCard.Loading />
        </Grid>
      ))}
    </Grid>
  );
}

// ----------------------------------------------------------------------

const PageFn = () => {
  const data = useContentData();
  const { genre } = useTabData();

  return (
    <Grid container spacing={1}>
      {data.posts.map((post, i) => (
        <Grid item key={i} xs={12} sm={6} md={4}>
          <WT_Post_RichCard data={post} hideGenre={genre !== "ALL"} />
        </Grid>
      ))}
    </Grid>
  );
};

// ----------------------------------------------------------------------

const PaginationFn = () => {
  const { pageCount, currentPage } = useContentData();
  const paginations = usePaginationx({ pageCount, currentPage });
  const searchParams = useSearchParams();

  return (
    <>
      {paginations.map((pagination, i) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", `${pagination.page}`);
        return (
          <PaginationItem
            key={i}
            component={NextLink}
            href={`/webtoon/post/list${createQueryString(params)}`}
            {...pagination}
          />
        );
      })}
    </>
  );
};

export const WT_Post_PageContent = Object.assign(ContentProvider, {
  Page: PageFn,
  Pagination: PaginationFn,
});
