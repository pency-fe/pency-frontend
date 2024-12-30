"use client";

import { useMemo } from "react";
import { NoSsr } from "@mui/material";
import { FilterChip } from "@pency/ui/components";
import { PAIR_LABEL } from "@/shared/config/webtoon/const";
import { useWtPostFilterFormToggle } from "../../model/wt-post-filter-form-toggle-provider";
import { useWtPostPairs } from "../../model/wt-post-pairs-providers";

export const WtPostGalleryPairs = () => {
  const { pairs } = useWtPostPairs();
  if (!pairs) {
    throw new Error(`<부모로 <WtPostPairsProvider /> 또는 <WtPostPairsStorageProvider /> 컴포넌트가 있어야 합니다.`);
  }
  const isOpen = useWtPostFilterFormToggle((s) => s.isOpen);
  const toggle = useWtPostFilterFormToggle((s) => s.toggle);

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
