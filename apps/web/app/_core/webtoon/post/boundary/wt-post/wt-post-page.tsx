"use client";

import React, { createContext, useContext } from "react";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import { useSuspenseQuery, UseSuspenseQueryResult } from "@tanstack/react-query";
import { Grid, PaginationItem } from "@mui/material";
import { usePaginationx } from "@pency/ui/hooks";
import { createQueryString, withAsyncBoundary } from "@pency/util";
import { WT_Post_RichCard } from "../../ui";
import { wtPostKeys } from "../../query";

// ----------------------------------------------------------------------

const DataContext = createContext<
  | {
      data: UseSuspenseQueryResult<
        Awaited<ReturnType<Exclude<ReturnType<typeof wtPostKeys.list>["queryFn"], undefined>>>
      >["data"];
      genre: Parameters<typeof wtPostKeys.list>[0]["genre"];
    }
  | undefined
>(undefined);

function useDataContext(component: string) {
  const context = useContext(DataContext);

  if (!context) throw new Error(`<${component} />의 부모로 <WT_Post_Page /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

type WT_Post_PageFnProps = Parameters<typeof wtPostKeys.list>[0] & { children?: React.ReactNode };

const WT_Post_PageFn = ({ genre, sort, page, children }: WT_Post_PageFnProps) => {
  const { data } = useSuspenseQuery(wtPostKeys.list({ genre, sort, page }));

  return <DataContext.Provider value={{ data, genre }}>{children}</DataContext.Provider>;
};

// ----------------------------------------------------------------------

const CardsFn = () => {
  const { data, genre } = useDataContext("WT_Post_Page.Cards");

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
  const {
    data: { pageCount, currentPage },
  } = useDataContext("WT_Post_Page.Pagination");
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

// ----------------------------------------------------------------------

const Loading = () => {
  return (
    <Grid container spacing={1}>
      {Array.from({ length: 18 }, (_, i) => (
        <Grid item key={i} xs={12} sm={6} md={4} sx={{ mb: 1.5 }}>
          <WT_Post_RichCard.Loading />
        </Grid>
      ))}
    </Grid>
  );
};

// ----------------------------------------------------------------------

export const WT_Post_Page = Object.assign(
  withAsyncBoundary(WT_Post_PageFn, {
    suspense: { fallback: <Loading /> },
    errorBoundary: {
      fallback: <Loading />,
    },
  }),
  { Cards: CardsFn, Pagination: PaginationFn },
);
