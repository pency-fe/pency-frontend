"use client";

import { useMemo } from "react";
import { NoSsr } from "@mui/material";
import { FilterChip } from "@pency/ui/components";
import { CREATION_TYPE_LABEL } from "@/shared/config/webtoon/const";
import { useWtPostCreationTypes } from "../../model/wt-post-creation-types-providers";
import { useWtPostFilterFormToggle } from "../../model/wt-post-filter-form-toggle-provider";

export const WtPostGalleryCreationTypes = () => {
  const { creationTypes } = useWtPostCreationTypes();
  if (!creationTypes) {
    throw new Error(
      `<부모로 <WtPostCreationTypesProvider /> 또는 <WtPostCreationTypesStorageProvider /> 컴포넌트가 있어야 합니다.`,
    );
  }
  const isOpen = useWtPostFilterFormToggle((s) => s.isOpen);
  const toggle = useWtPostFilterFormToggle((s) => s.toggle);

  const creationTypesLabel = useMemo(() => {
    let label = "창작유형";
    if (creationTypes.length === 1) {
      label = CREATION_TYPE_LABEL[creationTypes[0]!];
    } else if (creationTypes.length > 1) {
      label = `${CREATION_TYPE_LABEL[creationTypes[0]!]} 외 ${creationTypes.length - 1}`;
    }

    return label;
  }, [creationTypes]);

  return (
    <NoSsr>
      <FilterChip label={creationTypesLabel} open={isOpen} active={!!creationTypes.length} onClick={toggle} />
    </NoSsr>
  );
};
