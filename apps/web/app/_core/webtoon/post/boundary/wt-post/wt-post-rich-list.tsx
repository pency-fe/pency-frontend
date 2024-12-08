"use client";

import { withAsyncBoundary } from "@pency/util";
import { useSuspenseQuery, UseSuspenseQueryResult } from "@tanstack/react-query";
import { wtPostKeys } from "../../query";
import { Box, Grid, Skeleton, Stack } from "@mui/material";
import { WT_Post_RichCard } from "../../ui";
import React, { createContext, useContext } from "react";
import { usePaginationx } from "@pency/ui/hooks";

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

  if (!context) throw new Error(`<${component} />의 부모로 <WT_Post_RichList /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

type WT_Post_RichListFnProps = Parameters<typeof wtPostKeys.list>[0] & { children?: React.ReactNode };

const WT_Post_RichListFn = ({ genre, sort, page, children }: WT_Post_RichListFnProps) => {
  const { data } = useSuspenseQuery(wtPostKeys.list({ genre, sort, page }));

  return <DataContext.Provider value={{ data, genre }}>{children}</DataContext.Provider>;
};

// ----------------------------------------------------------------------

const ListFn = () => {
  const { data, genre } = useDataContext("WT_Post_RichList.List");

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

const Loading = () => {
  return (
    <Grid container spacing={1}>
      {Array.from({ length: 18 }, (_, i) => (
        <Grid item key={i} xs={12} sm={6} md={4} sx={{ mb: 1.5 }}>
          <Stack gap={1.5}>
            <Skeleton animation="wave" sx={{ height: "auto", aspectRatio: "16/9" }} />
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Skeleton variant="circular" animation="wave" width={36} height={36} />
              <Stack sx={{ flex: "1 1 auto", gap: 0.5 }}>
                <Skeleton animation="wave" height={14} />
                <Skeleton animation="wave" height={12} />
              </Stack>
            </Box>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

// ----------------------------------------------------------------------

export function usePagination() {
  const {
    data: { pageCount, currentPage },
  } = useDataContext("WT_Post_RichList.usePagination");

  return usePaginationx({ pageCount, currentPage });
}

// ----------------------------------------------------------------------

export const WT_Post_RichList = Object.assign(
  withAsyncBoundary(WT_Post_RichListFn, {
    suspense: { fallback: <Loading /> },
    errorBoundary: {
      fallback: <Loading />,
    },
  }),
  { List: ListFn, usePagination },
);
