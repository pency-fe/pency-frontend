"use client";

import { useMemo } from "react";
import { NoSsr } from "@mui/material";
import { FilterChip } from "@pency/ui/components";
import { PAIR_LABEL } from "@/shared/config/webtoon/const";
import { useFilterFormToggle } from "../../model/filter-form-toggle-provider";
import { PairsProvider, PairsStorageProvider, usePairs } from "../../model/pairs-provider";

type WtPostGalleryPairsFnProps = {
  variant?: "searchParam" | "storage";
  children?: React.ReactNode;
};

const WtPostGalleryPairsFn = ({ variant = "searchParam", children }: WtPostGalleryPairsFnProps) => {
  const Provider = useMemo(() => {
    if (variant === "storage") {
      return PairsStorageProvider;
    }

    return PairsProvider;
  }, [variant]);

  return <Provider>{children}</Provider>;
};

const FilterChipFn = () => {
  const { pairs } = usePairs();
  if (!pairs) {
    throw new Error(`<부모로 <WtPostGalleryPairs /> 컴포넌트가 있어야 합니다.`);
  }
  const isOpen = useFilterFormToggle((s) => s.isOpen);
  const toggle = useFilterFormToggle((s) => s.toggle);

  const pairsLabel = useMemo(() => {
    let label = "페어";
    if (pairs.length === 1) {
      label = PAIR_LABEL[pairs[0]!];
    } else if (pairs.length > 1) {
      label = `${PAIR_LABEL[pairs[0]!]} 외 ${pairs.length - 1}`;
    }

    return label;
  }, [pairs]);

  return (
    <NoSsr>
      <FilterChip label={pairsLabel} open={isOpen} active={!!pairs.length} onClick={toggle} />
    </NoSsr>
  );
};

export const WtPostGalleryPairs = Object.assign(WtPostGalleryPairsFn, {
  FilterChip: FilterChipFn,
});
