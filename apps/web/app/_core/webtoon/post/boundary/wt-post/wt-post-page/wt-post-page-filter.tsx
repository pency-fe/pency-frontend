"use client";

import { ComponentProps, createContext, useContext, useMemo, useState } from "react";
import { createStore, useStore } from "zustand";
import { Box, Collapse, NoSsr, Stack, useTheme } from "@mui/material";
import { FilterChip } from "@pency/ui/components";
import { CREATION_TYPE_LABEL, CreationType, Pair, PAIR_LABEL } from "_core/webtoon/post/const";
import { WT_Post_Filter_Form } from "../../wt-post-filter";
import { useSessionStorage } from "@pency/util";

// ----------------------------------------------------------------------
// 필터의 데이터를 구성합니다.
const FilterDataContext = createContext<{ creationTypes: CreationType[]; pairs: Pair[] } | undefined>(undefined);

export function useFilterData() {
  const context = useContext(FilterDataContext);

  if (!context) throw new Error(`<부모로 <FilterProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------
// 필터의 수정 작업을 구성합니다.
const FilterActionContext = createContext<
  { setCreationTypes: (value: CreationType[]) => void; setPairs: (value: Pair[]) => void } | undefined
>(undefined);

function useFilterAction() {
  const context = useContext(FilterActionContext);

  if (!context) throw new Error(`<부모로 <FilterProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------
// 필터 폼의 열림, 닫힘 상태를 구성합니다
type FilterFormOpenStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const createFilterFormOpenStore = () => {
  return createStore<FilterFormOpenStore>()((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    toggle: () => set(({ isOpen }) => ({ isOpen: !isOpen })),
  }));
};

const FormOpenContext = createContext<ReturnType<typeof createFilterFormOpenStore> | undefined>(undefined);

const useFilterFormOpenStore = <T,>(selector: (state: FilterFormOpenStore) => T): T => {
  const context = useContext(FormOpenContext);

  if (!context) throw new Error(`부모로 <FilterProvider /> 컴포넌트가 있어야 합니다.`);

  return useStore(context, selector);
};

// ----------------------------------------------------------------------

const FilterProvider = ({ children }: { children?: React.ReactNode }) => {
  const [creationTypes, setCreationTypes] = useSessionStorage<CreationType[]>("wt-post-page-filter-creation-type", []);
  const [pairs, setPairs] = useSessionStorage<Pair[]>("wt-post-page-filter-pair", []);
  const [filterFormOpenStore] = useState(createFilterFormOpenStore);

  const contextValue = useMemo(
    () => ({
      creationTypes,
      pairs,
    }),
    [creationTypes, pairs],
  );

  const contextAction = useMemo(
    () => ({
      setCreationTypes,
      setPairs,
    }),
    [setCreationTypes, setPairs],
  );

  return (
    <FilterDataContext.Provider value={contextValue}>
      <FilterActionContext.Provider value={contextAction}>
        <FormOpenContext.Provider value={filterFormOpenStore}>{children}</FormOpenContext.Provider>
      </FilterActionContext.Provider>
    </FilterDataContext.Provider>
  );
};

// ----------------------------------------------------------------------
// https://nextjs.org/docs/messages/react-hydration-error#solution-2-disabling-ssr-on-specific-components

const CreationTypesFilterFn = () => {
  const { creationTypes } = useFilterData();
  const isOpen = useFilterFormOpenStore((s) => s.isOpen);
  const toggle = useFilterFormOpenStore((s) => s.toggle);

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

// ----------------------------------------------------------------------
// https://nextjs.org/docs/messages/react-hydration-error#solution-2-disabling-ssr-on-specific-components

const PairsFilterFn = () => {
  const { pairs } = useFilterData();
  const isOpen = useFilterFormOpenStore((s) => s.isOpen);
  const toggle = useFilterFormOpenStore((s) => s.toggle);

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

// ----------------------------------------------------------------------
// https://nextjs.org/docs/messages/react-hydration-error#solution-2-disabling-ssr-on-specific-components

const FilterFormFn = () => {
  const { creationTypes, pairs } = useFilterData();
  const { setCreationTypes, setPairs } = useFilterAction();

  const isOpen = useFilterFormOpenStore((s) => s.isOpen);
  const close = useFilterFormOpenStore((s) => s.close);

  const theme = useTheme();

  const saveFilter: ComponentProps<typeof WT_Post_Filter_Form.SaveSubmit>["onSubmit"] = (data) => {
    setCreationTypes(data.creationTypes);
    setPairs(data.pairs);
    close();
  };

  const resetFilter: ComponentProps<typeof WT_Post_Filter_Form.Reset>["onReset"] = (data) => {
    setCreationTypes(data.creationTypes);
    setPairs(data.pairs);
    close();
  };

  return (
    <NoSsr>
      <Collapse in={isOpen}>
        <WT_Post_Filter_Form
          defaultValue={{
            creationTypes,
            pairs,
          }}
        >
          <Stack
            spacing={2}
            sx={{ bgcolor: theme.vars.palette.background.paper, borderRadius: 1, px: "20px", py: "12px" }}
          >
            <WT_Post_Filter_Form.CreationTypes />
            <WT_Post_Filter_Form.Pairs />

            <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
              <WT_Post_Filter_Form.Reset onReset={resetFilter} />
              <WT_Post_Filter_Form.SaveSubmit onSubmit={saveFilter} />
            </Box>
          </Stack>
        </WT_Post_Filter_Form>
      </Collapse>
    </NoSsr>
  );
};

export const WT_Post_PageFilter = Object.assign(FilterProvider, {
  CreationTypesFilter: CreationTypesFilterFn,
  PairsFilter: PairsFilterFn,
  FilterForm: FilterFormFn,
});
