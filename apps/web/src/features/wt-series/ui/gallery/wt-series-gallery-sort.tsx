"use client";

import { createContext, useContext, useMemo } from "react";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { MenuItem } from "@mui/material";
import { FilterChip, Menux, useMenuxState } from "@pency/ui/components";
import { arrayIncludes, createQueryString, objectEntries, objectKeys } from "@pency/util";
import { Sort, SortContext, useSort } from "../../model/sort-context";

// ----------------------------------------------------------------------

type SortProviderProps = {
  sorts: Sort[];
  children?: React.ReactNode;
};

function SortProvider({ sorts, children }: SortProviderProps) {
  const sortParam = useSearchParams().get("sort");

  const sort = useMemo(() => {
    if (sortParam && arrayIncludes(sorts, sortParam)) {
      return sortParam as Sort;
    }
    return "LATEST" as Sort;
  }, [sortParam, sorts]);

  return <SortContext.Provider value={{ sort }}>{children}</SortContext.Provider>;
}

// ----------------------------------------------------------------------

type SortLabel = Partial<Record<Sort, string>>;

const DataContext = createContext<{ sortLabel: SortLabel } | undefined>(undefined);

function useData() {
  const context = useContext(DataContext);

  if (!context) throw new Error(`부모로 <WtSeriesGallerySort /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

const WtSeriesGallerySortFn = ({ sortLabel, children }: { sortLabel: SortLabel; children?: React.ReactNode }) => {
  return (
    <SortProvider sorts={objectKeys(sortLabel)}>
      <DataContext.Provider value={{ sortLabel }}>{children}</DataContext.Provider>
    </SortProvider>
  );
};

// ----------------------------------------------------------------------

const FilterChipFn = () => {
  const { sort } = useSort();
  const { sortLabel } = useData();
  if (!sort) {
    throw new Error(`<부모로 <WtSeriesSortProvider /> 컴포넌트가 있어야 합니다.`);
  }

  const { anchorRef, isOpen, close, toggle } = useMenuxState<HTMLDivElement>();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sortEntries = useMemo(() => objectEntries(sortLabel), []);

  return (
    <>
      <FilterChip ref={anchorRef} label={sortLabel[sort]} open={isOpen} onClick={toggle} />
      <Menux
        open={isOpen}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        onClose={close}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 6],
            },
          },
        ]}
        sx={{ width: "150px" }}
      >
        {sortEntries.map(([value, label]) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("sort", value);
          return (
            <MenuItem
              key={value}
              component={NextLink}
              href={`${pathname}${createQueryString(params)}`}
              selected={sort === value}
              onClick={close}
            >
              {label}
            </MenuItem>
          );
        })}
      </Menux>
    </>
  );
};

export const WtSeriesGallerySort = Object.assign(WtSeriesGallerySortFn, {
  FilterChip: FilterChipFn,
});
