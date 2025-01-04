"use client";

import { ComponentProps, createContext, useContext, useMemo } from "react";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Grid, PaginationItem } from "@mui/material";
import { usePaginationx } from "@pency/ui/hooks";
import { createQueryString, withAsyncBoundary } from "@pency/util";
import { wtPostKeys, WtPostRichCard } from "@/entities/wt-post";
import { useGenre } from "../../model/genre-context";
import { useSort } from "../../model/sort-context";
import { useCreationTypes } from "../../model/creation-types-context";
import { usePairs } from "../../model/pairs-context";
import { PickQueryOptionsData } from "@/shared/lib/react-query/types";
import { PageContext, usePage } from "../../model/page-context";
import { ChannelUrlContext } from "../../model/channel-url-context";

const DataContext = createContext<
  | {
      data: PickQueryOptionsData<ReturnType<typeof wtPostKeys.page>>;
    }
  | undefined
>(undefined);

const useData = () => {
  const context = useContext(DataContext);

  if (!context) throw new Error(`부모로 <WtPostGallery /> 컴포넌트가 있어야 합니다.`);

  return context;
};

// ----------------------------------------------------------------------

const PageProvider = ({ children }: { children?: React.ReactNode }) => {
  const pageParam = useSearchParams().get("page");

  const page = useMemo(() => {
    const param = Number(pageParam);
    if (param && !isNaN(param) && param >= 1) {
      return param;
    }
    return 1;
  }, [pageParam]);

  return <PageContext.Provider value={{ page }}>{children}</PageContext.Provider>;
};

// ----------------------------------------------------------------------

const ChannelUrlProvider = ({ channelUrl, children }: { channelUrl?: string; children?: React.ReactNode }) => {
  return <ChannelUrlContext.Provider value={{ channelUrl }}>{children}</ChannelUrlContext.Provider>;
};

// ----------------------------------------------------------------------

type WtPostGalleryFnProps = {
  channelUrl?: string;
  children?: React.ReactNode;
};

const WtPostGalleryFn = ({ channelUrl, children }: WtPostGalleryFnProps) => {
  const { genre } = useGenre();
  const { sort } = useSort();
  const { page } = usePage();
  const { creationTypes } = useCreationTypes();
  const { pairs } = usePairs();

  const { data } = useSuspenseQuery(wtPostKeys.page({ genre, sort, page, creationTypes, pairs, channelUrl }));

  return (
    <ChannelUrlProvider channelUrl={channelUrl}>
      <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
    </ChannelUrlProvider>
  );
};

// ----------------------------------------------------------------------

type PanelFnProps = {
  Menu: ComponentProps<typeof WtPostRichCard>["Menu"];
};

const PanelFn = ({ Menu }: PanelFnProps) => {
  const { data } = useData();
  const { genre } = useGenre();

  return (
    <Grid container spacing={1}>
      {data.posts.map((post, i) => (
        <Grid item key={i} xs={12} sm={6} md={4}>
          <WtPostRichCard data={post} Menu={Menu} hideGenre={genre !== "ALL"} />
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
          <WtPostRichCard.Loading />
        </Grid>
      ))}
    </Grid>
  );
};

// ----------------------------------------------------------------------

const PaginationFn = () => {
  const {
    data: { pageCount },
  } = useData();
  const { page } = usePage();

  if (!page) {
    throw new Error(`<부모로 <WtPostGallery /> 컴포넌트가 있어야 합니다.`);
  }

  const paginations = usePaginationx({ pageCount, currentPage: page });
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

// ----------------------------------------------------------------------

export const WtPostGallery = Object.assign(
  withAsyncBoundary(
    (rest: WtPostGalleryFnProps) => (
      <PageProvider>
        <WtPostGalleryFn {...rest} />
      </PageProvider>
    ),
    {
      errorBoundary: {
        fallback: <Loading />,
      },
      suspense: {
        fallback: <Loading />,
      },
    },
  ),
  {
    Panel: PanelFn,
    Pagination: PaginationFn,
  },
);
