"use client";

import { ComponentProps, useMemo } from "react";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { MenuItem } from "@mui/material";
import { FilterChip, Menux, useMenuxState } from "@pency/ui/components";
import { createQueryString, objectEntries } from "@pency/util";
import { SortProvider, useSort } from "../../model/sort-provider";

const WtPostGallerySortFn = (rest: ComponentProps<typeof SortProvider>) => {
  return <SortProvider {...rest} />;
};

const FilterChipFn = () => {
  const { sort, sortLabel } = useSort();
  if (!sort || !sortLabel) {
    throw new Error(`<부모로 <WtPostSortProvider /> 컴포넌트가 있어야 합니다.`);
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

export const WtPostGallerySort = Object.assign(WtPostGallerySortFn, {
  FilterChip: FilterChipFn,
});
