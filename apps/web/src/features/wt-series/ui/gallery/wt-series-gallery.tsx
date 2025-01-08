"use client";

import { createContext, useContext, useMemo } from "react";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Grid, PaginationItem } from "@mui/material";
import { usePaginationx } from "@pency/ui/hooks";
import { AsyncBoundary, createQueryString } from "@pency/util";
import { useGenres } from "../../model/genres-context";
import { useSort } from "../../model/sort-context";
import { useCreationTypes } from "../../model/creation-types-context";
import { usePairs } from "../../model/pairs-context";
import { PickQueryOptionsData } from "@/shared/lib/react-query/types";
import { PageContext, usePage } from "../../model/page-context";
import { ChannelUrlContext } from "../../model/channel-url-context";
import { wtSeriesKeys, WtSeriesRichCard } from "@/entities/wt-series";
import { FeedbackButtonComponent } from "../../model/feedback-button-types";

const DataContext = createContext<
  | {
      data: PickQueryOptionsData<ReturnType<typeof wtSeriesKeys.page>>;
    }
  | undefined
>(undefined);

const useData = () => {
  const context = useContext(DataContext);

  if (!context) throw new Error(`부모로 <WtSeriesGallery /> 컴포넌트가 있어야 합니다.`);

  return context;
};

// ----------------------------------------------------------------------

type WtSeriesGalleryFnProps = GalleryProps;

const WtSeriesGalleryFn = (rest: WtSeriesGalleryFnProps) => {
  return (
    <AsyncBoundary errorBoundary={{ fallback: <Loading /> }} suspense={{ fallback: <Loading /> }}>
      <Gallery {...rest} />
    </AsyncBoundary>
  );
};

// ----------------------------------------------------------------------

type GalleryProps = {
  channelUrl?: string;
  children?: React.ReactNode;
};

const Gallery = ({ channelUrl, children }: GalleryProps) => {
  const { genres } = useGenres();
  const { creationTypes } = useCreationTypes();
  const { pairs } = usePairs();
  const { sort } = useSort();

  const pageParam = useSearchParams().get("page");
  const page = useMemo(() => {
    const param = Number(pageParam);
    if (param && !isNaN(param) && param >= 1) {
      return param;
    }
    return 1;
  }, [pageParam]);

  const { data } = useSuspenseQuery(wtSeriesKeys.page({ genres, creationTypes, pairs, sort, page, channelUrl }));

  return (
    <ChannelUrlContext.Provider value={{ channelUrl }}>
      <PageContext.Provider value={{ page }}>
        <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
      </PageContext.Provider>
    </ChannelUrlContext.Provider>
  );
};

// ----------------------------------------------------------------------

type PanelFnProps = {
  FeedbackButton: FeedbackButtonComponent;
};

const PanelFn = ({ FeedbackButton }: PanelFnProps) => {
  const { data } = useData();

  return (
    <Grid container spacing={{ xs: 1, sm: 1 }}>
      {data.serieses.map((series, i) => (
        <Grid item key={i} xs={12} sm={6} md={4}>
          <WtSeriesRichCard data={series} feedbackButton={<FeedbackButton data={series} />} />
        </Grid>
      ))}
    </Grid>
  );
};

// ----------------------------------------------------------------------

const Loading = () => {
  return (
    <Grid container spacing={{ xs: 1, sm: 1 }}>
      {Array.from({ length: 18 }, (_, i) => (
        <Grid item key={i} xs={12} sm={6} md={4}>
          <WtSeriesRichCard.Loading />
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
    throw new Error(`<부모로 <WtSeriesGallery /> 컴포넌트가 있어야 합니다.`);
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

export const WtSeriesGallery = Object.assign(WtSeriesGalleryFn, {
  Panel: PanelFn,
  Pagination: PaginationFn,
});
