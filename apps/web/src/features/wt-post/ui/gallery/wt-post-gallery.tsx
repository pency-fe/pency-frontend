"use client";

import { createContext, useContext, useMemo } from "react";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Grid, PaginationItem } from "@mui/material";
import { produce } from "immer";
import { usePaginationx } from "@pency/ui/hooks";
import { createQueryString, withAsyncBoundary } from "@pency/util";
import { wtPostKeys, WtPostRichCard } from "@/entities/wt-post";
import { PickQueryOptionsData } from "@/shared/lib/react-query/types";
import { useBookmark } from "../../model/gallery/use-bookmark";
import { useUnbookmark } from "../../model/gallery/use-unbookmark";
import { useBlock } from "../../model/gallery/use-block";
import { useUnblock } from "../../model/gallery/use-unblock";
import { useChannelMeListContext } from "@/entities/channel-me";
import { useGenre } from "../../model/gallery/genre-provider";
import { useSort } from "../../model/gallery/sort-provider";
import { useCreationTypes } from "../../model/gallery/creation-types-provider";
import { usePairs } from "../../model/gallery/pairs-provider";

// ----------------------------------------------------------------------

const WtPostGalleryDataContext = createContext<
  | {
      data: PickQueryOptionsData<ReturnType<typeof wtPostKeys.page>>;
    }
  | undefined
>(undefined);

function useWtPostGalleryData() {
  const context = useContext(WtPostGalleryDataContext);

  if (!context) throw new Error(`부모로 <WtPostGallery /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

type PageContentFnProps = {
  channelUrl?: string;
  children?: React.ReactNode;
};

const WtPostGalleryFn = withAsyncBoundary(
  ({ channelUrl, children }: PageContentFnProps) => {
    const queryClient = useQueryClient();
    const pageParam = useSearchParams().get("page");
    const channelMeList = useChannelMeListContext();

    const { genre } = useGenre();
    const { sort } = useSort();
    const { creationTypes } = useCreationTypes();
    const { pairs } = usePairs();
    const page = useMemo(() => {
      const param = Number(pageParam);
      if (param && !isNaN(param) && param >= 1) {
        return param;
      }
      return 1;
    }, [pageParam]);

    const { data } = useSuspenseQuery(wtPostKeys.page({ genre, sort, page, creationTypes, pairs, channelUrl }));
    const bookmark = useBookmark();
    const unbookmark = useUnbookmark();
    const block = useBlock();
    const unblock = useUnblock();

    const handleBookmark = (id: number) => {
      bookmark({ id }, () => {
        queryClient.setQueryData(
          wtPostKeys.page({ genre, sort, page: data.currentPage, creationTypes, pairs, channelUrl }).queryKey,
          (oldData) =>
            oldData &&
            produce(oldData, (draft) => {
              draft.posts.find((post) => post.id === id)!.bookmark = true;
            }),
        );
      });
    };

    const handleUnbookmark = (id: number) => {
      unbookmark({ id }, () => {
        queryClient.setQueryData(
          wtPostKeys.page({ genre, sort, page: data.currentPage, creationTypes, pairs, channelUrl }).queryKey,
          (oldData) =>
            oldData &&
            produce(oldData, (draft) => {
              draft.posts.find((post) => post.id === id)!.bookmark = false;
            }),
        );
      });
    };

    const handleBlock = (id: number) => {
      block({ id }, () => {
        queryClient.setQueryData(
          wtPostKeys.page({ genre, sort, page: data.currentPage, creationTypes, pairs, channelUrl }).queryKey,
          (oldData) =>
            oldData &&
            produce(oldData, (draft) => {
              draft.posts.find((post) => post.channel.id === id)!.block = true;
            }),
        );
      });
    };

    const handleUnblock = (id: number) => {
      unblock({ id }, () => {
        queryClient.setQueryData(
          wtPostKeys.page({ genre, sort, page: data.currentPage, creationTypes, pairs, channelUrl }).queryKey,
          (oldData) =>
            oldData &&
            produce(oldData, (draft) => {
              draft.posts.find((post) => post.channel.id === id)!.block = false;
            }),
        );
      });
    };

    return (
      <WtPostGalleryDataContext.Provider value={{ data }}>
        <Grid container spacing={1}>
          {data.posts.map((post, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <WtPostRichCard
                data={post}
                onBookmark={handleBookmark}
                onUnbookmark={handleUnbookmark}
                onBlock={handleBlock}
                onUnblock={handleUnblock}
                isMyPost={channelMeList ? channelMeList.some((channel) => channel.id === post.channel.id) : false}
                hideGenre={genre !== "ALL"}
              />
            </Grid>
          ))}
        </Grid>
        {children}
      </WtPostGalleryDataContext.Provider>
    );
  },
  {
    errorBoundary: {
      fallback: <Loading />,
    },
    suspense: {
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
          <WtPostRichCard.Loading />
        </Grid>
      ))}
    </Grid>
  );
}

// ----------------------------------------------------------------------

const PaginationFn = () => {
  const {
    data: { pageCount, currentPage },
  } = useWtPostGalleryData();
  const paginations = usePaginationx({ pageCount, currentPage });
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <>
      {paginations.map((pagination, i) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", `${pagination.page}`);
        return (
          <PaginationItem
            key={i}
            component={NextLink}
            href={`${pathname}${createQueryString(params)}`}
            {...pagination}
          />
        );
      })}
    </>
  );
};

export const WtPostGallery = Object.assign(WtPostGalleryFn, {
  Pagination: PaginationFn,
});
