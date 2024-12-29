"use client";

import { createContext, useContext, useMemo } from "react";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { MenuItem } from "@mui/material";
import { FilterChip, Menux, useMenuxState } from "@pency/ui/components";
import { createQueryString, objectEntries } from "@pency/util";

// ----------------------------------------------------------------------

type Sort = "LATEST" | "POPULAR" | "WPOPULAR";

type SortLabel = Partial<Record<Sort, string>>;

const OrderDataContext = createContext<{ sort: Sort; sortLabel: SortLabel } | undefined>(undefined);

export function useOrderData() {
  const context = useContext(OrderDataContext);

  return context ?? { sort: undefined, sortLabel: undefined };
}

type OrderProviderProps = {
  sortLabel: SortLabel;
  children?: React.ReactNode;
};

const OrderProvider = ({ sortLabel, children }: OrderProviderProps) => {
  const sortParam = useSearchParams().get("sort");

  const sort = useMemo(() => {
    if (sortParam && Object.keys(sortLabel).includes(sortParam)) {
      return sortParam as Sort;
    }
    return "LATEST" as Sort;
  }, [sortParam]);

  return <OrderDataContext.Provider value={{ sort, sortLabel }}>{children}</OrderDataContext.Provider>;
};

// ----------------------------------------------------------------------

const OrderFn = () => {
  const { sort, sortLabel } = useOrderData();
  if (!sort || !sortLabel) {
    throw new Error(`<부모로 <OrderProvider /> 컴포넌트가 있어야 합니다.`);
  }

  const { anchorRef, isOpen, close, toggle } = useMenuxState<HTMLDivElement>();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sorts = useMemo(() => objectEntries(sortLabel), []);

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
        {sorts.map(([value, label]) => {
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

export const WT_Post_PageOrder = Object.assign(OrderProvider, {
  Order: OrderFn,
});
