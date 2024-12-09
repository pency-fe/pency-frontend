"use client";

import { createContext, useContext, useMemo } from "react";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import { MenuItem } from "@mui/material";
import { FilterChip, Menux, useMenuxState } from "@pency/ui/components";
import { createQueryString, objectEntries } from "@pency/util";

// ----------------------------------------------------------------------

type Sort = "LATEST" | "POPULAR" | "WPOPULAR";

const SORT_LABEL: Record<Sort, string> = {
  LATEST: "최신순",
  POPULAR: "전체 인기순",
  WPOPULAR: "주간 인기순",
};

const OrderDataContext = createContext<{ sort: Sort } | undefined>(undefined);

export function useOrderData() {
  const context = useContext(OrderDataContext);

  if (!context) throw new Error(`<부모로 <OrderProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
}

const OrderProvider = ({ children }: { children?: React.ReactNode }) => {
  const searchParams = useSearchParams();

  const sort = useMemo(() => {
    const param = searchParams.get("sort");
    if (param && Object.keys(SORT_LABEL).includes(param)) {
      return param as Sort;
    }
    return "LATEST" as Sort;
  }, [searchParams]);

  return <OrderDataContext.Provider value={{ sort }}>{children}</OrderDataContext.Provider>;
};

// ----------------------------------------------------------------------

const OrderFn = () => {
  const { anchorRef, isOpen, close, toggle } = useMenuxState<HTMLDivElement>();
  const { sort } = useOrderData();
  const searchParams = useSearchParams();

  const sorts = useMemo(() => objectEntries(SORT_LABEL), []);

  return (
    <>
      <FilterChip ref={anchorRef} label={SORT_LABEL[sort]} open={isOpen} onClick={toggle} />
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
              href={`/webtoon/post/list${createQueryString(params)}`}
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
