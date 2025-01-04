"use client";

import { ComponentProps, createContext, useContext, useMemo } from "react";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Grid, PaginationItem } from "@mui/material";
import { usePaginationx } from "@pency/ui/hooks";
import { AsyncBoundary, createQueryString } from "@pency/util";
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

type Variant = "primary" | "secondary";

const VariantContext = createContext<{ variant: Variant } | undefined>(undefined);

const useVariant = () => {
  const context = useContext(VariantContext);

  if (!context) throw new Error(`부모로 <WtPostGallery /> 컴포넌트가 있어야 합니다.`);

  return context;
};

// ----------------------------------------------------------------------

type WtPostGalleryFnProps = { variant?: Variant } & GalleryProps;

const WtPostGalleryFn = ({ variant = "primary", ...rest }: WtPostGalleryFnProps) => {
  return (
    <VariantContext.Provider value={{ variant }}>
      <AsyncBoundary errorBoundary={{ fallback: <Loading /> }} suspense={{ fallback: <Loading /> }}>
        <Gallery {...rest} />
      </AsyncBoundary>
    </VariantContext.Provider>
  );
};

// ----------------------------------------------------------------------

type GalleryProps = {
  channelUrl?: string;
  children?: React.ReactNode;
};

const Gallery = ({ channelUrl, children }: GalleryProps) => {
  const { genre } = useGenre();
  const { sort } = useSort();

  const pageParam = useSearchParams().get("page");
  const page = useMemo(() => {
    const param = Number(pageParam);
    if (param && !isNaN(param) && param >= 1) {
      return param;
    }
    return 1;
  }, [pageParam]);

  const { creationTypes } = useCreationTypes();
  const { pairs } = usePairs();

  const { data } = useSuspenseQuery(wtPostKeys.page({ genre, sort, page, creationTypes, pairs, channelUrl }));

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
  Menu: ComponentProps<typeof WtPostRichCard>["Menu"];
};

const PanelFn = ({ Menu }: PanelFnProps) => {
  const { data } = useData();
  const { genre } = useGenre();
  const { variant } = useVariant();

  return (
    <Grid container spacing={{ xs: variant === "primary" ? 1 : 0.5, sm: 1 }}>
      {data.posts.map((post, i) => (
        <Grid item key={i} xs={variant === "primary" ? 12 : 6} sm={6} md={4}>
          <WtPostRichCard data={post} Menu={Menu} hideGenre={genre !== "ALL"} />
        </Grid>
      ))}
    </Grid>
  );
};

// ----------------------------------------------------------------------

const Loading = () => {
  const { variant } = useVariant();

  return (
    <Grid container spacing={{ xs: variant === "primary" ? 1 : 0.5, sm: 1 }}>
      {Array.from({ length: 18 }, (_, i) => (
        <Grid item key={i} xs={variant === "primary" ? 12 : 6} sm={6} md={4}>
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

export const WtPostGallery = Object.assign(WtPostGalleryFn, {
  Panel: PanelFn,
  Pagination: PaginationFn,
});
