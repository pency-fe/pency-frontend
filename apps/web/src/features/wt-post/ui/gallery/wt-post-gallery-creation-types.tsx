"use client";

import { useMemo } from "react";
import { NoSsr } from "@mui/material";
import { FilterChip } from "@pency/ui/components";
import { CREATION_TYPE_LABEL } from "@/shared/config/webtoon/const";
import {
  CreationTypesProvider,
  CreationTypesStorageProvider,
  useCreationTypes,
} from "../../model/creation-types-provider";
import { useFilterFormToggle } from "../../model/filter-form-toggle-provider";

type WtPostGalleryCreationTypesFnProps = {
  variant?: "searchParam" | "storage";
  children?: React.ReactNode;
};

const WtPostGalleryCreationTypesFn = ({ variant = "searchParam", children }: WtPostGalleryCreationTypesFnProps) => {
  const Provider = useMemo(() => {
    if (variant === "storage") {
      return CreationTypesStorageProvider;
    }

    return CreationTypesProvider;
  }, [variant]);

  return <Provider>{children}</Provider>;
};

export const FilterChipFn = () => {
  const { creationTypes } = useCreationTypes();
  if (!creationTypes) {
    throw new Error(`<부모로 <WtPostGalleryCreationTypes /> 컴포넌트가 있어야 합니다.`);
  }
  const isOpen = useFilterFormToggle((s) => s.isOpen);
  const toggle = useFilterFormToggle((s) => s.toggle);

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

export const WtPostGalleryCreationTypes = Object.assign(WtPostGalleryCreationTypesFn, {
  FilterChip: FilterChipFn,
});
