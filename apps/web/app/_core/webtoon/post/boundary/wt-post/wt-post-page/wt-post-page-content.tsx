"use client";

import { createContext, useContext, useMemo } from "react";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { Grid, PaginationItem } from "@mui/material";
import { usePaginationx } from "@pency/ui/hooks";
import { createQueryString, withAsyncBoundary } from "@pency/util";
import { wtPostKeys } from "_core/webtoon/post/query";
import { WT_Post_RichCard } from "_core/webtoon/post/ui";
import { useTabData } from "./wt-post-page-tab";
import { useOrderData } from "./wt-post-page-order";
import { useFilterData } from "./wt-post-page-filter";
import { produce } from "immer";

// ----------------------------------------------------------------------

const PageContentDataContext = createContext<
  | {
      data: Exclude<
        UseQueryResult<Awaited<ReturnType<Exclude<ReturnType<typeof wtPostKeys.page>["queryFn"], undefined>>>>["data"],
        undefined
      >;
      channelUrl?: string;
    }
  | undefined
>(undefined);

function usePageContentData() {
  const context = useContext(PageContentDataContext);

  if (!context) throw new Error(`부모로 <PageContentProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
}

type PageContentFnProps = {
  channelUrl?: string;
  children?: React.ReactNode;
};

const PageContentProvider = withAsyncBoundary(
  ({ channelUrl, children }: PageContentFnProps) => {
    const { genre } = useTabData();
    const { sort } = useOrderData();
    const { creationTypes, pairs } = useFilterData();
    const pageParam = useSearchParams().get("page");

    const page = useMemo(() => {
      const param = Number(pageParam);
      if (param && !isNaN(param) && param >= 1) {
        return param;
      }
      return 1;
    }, [pageParam]);

    const { status, data } = useQuery({
      ...wtPostKeys.page({ genre, sort, page, creationTypes, pairs, channelUrl }),
      throwOnError: true,
    });

    if (status !== "success") {
      return <Loading />;
    }

    return <PageContentDataContext.Provider value={{ data, channelUrl }}>{children}</PageContentDataContext.Provider>;
  },
  {
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
  const { data, channelUrl } = usePageContentData();
  const { genre } = useTabData();
  const { sort } = useOrderData();
  const { creationTypes, pairs } = useFilterData();

  const queryClient = useQueryClient();

  const handleBookmark = (id: number) => {
    queryClient.setQueryData(
      wtPostKeys.page({ genre, sort, page: data.currentPage, creationTypes, pairs, channelUrl }).queryKey,
      (oldData) =>
        oldData &&
        produce(oldData, (draft) => {
          draft.posts.find((post) => post.id === id)!.bookmark = true;
        }),
    );
  };

  const handleUnbookmark = (id: number) => {
    queryClient.setQueryData(
      wtPostKeys.page({ genre, sort, page: data.currentPage, creationTypes, pairs, channelUrl }).queryKey,
      (oldData) =>
        oldData &&
        produce(oldData, (draft) => {
          draft.posts.find((post) => post.id === id)!.bookmark = false;
        }),
    );
  };

  const handleBlock = (id: number) => {
    queryClient.setQueryData(
      wtPostKeys.page({ genre, sort, page: data.currentPage, creationTypes, pairs, channelUrl }).queryKey,
      (oldData) =>
        oldData &&
        produce(oldData, (draft) => {
          draft.posts.find((post) => post.channel.id === id)!.block = true;
        }),
    );
  };

  const handleUnblock = (id: number) => {
    queryClient.setQueryData(
      wtPostKeys.page({ genre, sort, page: data.currentPage, creationTypes, pairs, channelUrl }).queryKey,
      (oldData) =>
        oldData &&
        produce(oldData, (draft) => {
          draft.posts.find((post) => post.channel.id === id)!.block = false;
        }),
    );
  };

  return (
    <Grid container spacing={1}>
      {data.posts.map((post, i) => (
        <Grid item key={i} xs={12} sm={6} md={4}>
          <WT_Post_RichCard
            data={post}
            onBookmark={handleBookmark}
            onUnbookmark={handleUnbookmark}
            onBlock={handleBlock}
            onUnblock={handleUnblock}
            hideGenre={genre !== "ALL"}
          />
        </Grid>
      ))}
    </Grid>
  );
};

// ----------------------------------------------------------------------

const PaginationFn = () => {
  const {
    data: { pageCount, currentPage },
  } = usePageContentData();
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

export const WT_Post_PageContent = Object.assign(PageContentProvider, {
  Page: PageFn,
  Pagination: PaginationFn,
});
