"use client";

import { useMemo } from "react";
import { NoSsr } from "@mui/material";
import { arrayIncludes, objectKeys, useSessionStorage } from "@pency/util";
import { FilterChip } from "@pency/ui/components";
import { CREATION_TYPE_LABEL, CreationType } from "@/shared/config/webtoon/const";
import { CreationTypesContext, useCreationTypes } from "../../model/creation-types-context";
import { useFilterFormToggle } from "../../model/filter-form-toggle-context";
import { useSearchParams } from "next/navigation";

// ----------------------------------------------------------------------

function CreationTypesProvider({ children }: { children?: React.ReactNode }) {
  const searchParams = useSearchParams();

  const creationTypes = useMemo(() => {
    const params = searchParams.getAll("creationTypes");
    const creationTypeKeys = objectKeys(CREATION_TYPE_LABEL);

    return params.filter((param) => arrayIncludes(creationTypeKeys, param));
  }, [searchParams]);

  return (
    <CreationTypesContext.Provider value={{ creationTypes, setCreationTypes: undefined }}>
      {children}
    </CreationTypesContext.Provider>
  );
}

// ----------------------------------------------------------------------

function CreationTypesStorageProvider({ children }: { children?: React.ReactNode }) {
  const [creationTypes, setCreationTypes] = useSessionStorage<CreationType[]>("wt-series-creation-types", []);

  return (
    <CreationTypesContext.Provider value={{ creationTypes, setCreationTypes }}>
      {children}
    </CreationTypesContext.Provider>
  );
}

// ----------------------------------------------------------------------

type WtSeriesGalleryCreationTypesFnProps = {
  variant?: "searchParams" | "storage";
  children?: React.ReactNode;
};

const WtSeriesGalleryCreationTypesFn = ({
  variant = "searchParams",
  children,
}: WtSeriesGalleryCreationTypesFnProps) => {
  const Provider = useMemo(() => {
    if (variant === "storage") {
      return CreationTypesStorageProvider;
    }

    return CreationTypesProvider;
  }, [variant]);

  return <Provider>{children}</Provider>;
};

export const FilterChipFn = () => {
  const { creationTypes, setCreationTypes } = useCreationTypes();
  if (!creationTypes) {
    throw new Error(`<부모로 <WtSeriesGalleryCreationTypes /> 컴포넌트가 있어야 합니다.`);
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
    <>
      {setCreationTypes ? (
        <NoSsr>
          <FilterChip label={creationTypesLabel} open={isOpen} active={!!creationTypes.length} onClick={toggle} />
        </NoSsr>
      ) : (
        <FilterChip label={creationTypesLabel} open={isOpen} active={!!creationTypes.length} onClick={toggle} />
      )}
    </>
  );
};

export const WtSeriesGalleryCreationTypes = Object.assign(WtSeriesGalleryCreationTypesFn, {
  FilterChip: FilterChipFn,
});
