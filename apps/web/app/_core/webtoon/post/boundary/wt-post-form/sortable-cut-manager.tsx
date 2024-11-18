"use client";

import { Button, IconButton, Stack } from "@mui/material";
import { MingcuteDelete3LineIcon } from "@pency/ui/components";
import { createContext, RefObject, useContext, useState } from "react";
import { createStore, useStore } from "zustand";

// ----------------------------------------------------------------------

type ActiveCutRefStore = {
  activeCutRef: RefObject<HTMLElement> | null;
  toggleActiveCutRef: (ref: RefObject<HTMLElement>) => void;
};

const createActiveCutRefStore = () => {
  return createStore<ActiveCutRefStore>()((set) => ({
    activeCutRef: null,
    onKeyDown: null,
    toggleActiveCutRef: (ref) => {
      set((state) => ({ activeCutRef: ref !== state.activeCutRef ? ref : null }));
    },
  }));
};

const ActiveCutRefContext = createContext<ReturnType<typeof createActiveCutRefStore> | undefined>(undefined);

export function useActiveCutRefContext<T>(selector: (state: ActiveCutRefStore) => T): T {
  const context = useContext(ActiveCutRefContext);

  if (!context) throw new Error(`부모로 <SortableCutManager /> 컴포넌트가 있어야 합니다.`);

  return useStore(context, selector);
}

// ----------------------------------------------------------------------

type CutHandler = {
  moveCutLeft: (cut: string) => void;
};

const CutHandlerContext = createContext<CutHandler | undefined>(undefined);

export function useCutHandlerContext() {
  const context = useContext(CutHandlerContext);

  if (!context) throw new Error(`부모로 <SortableCutManager /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

type SortableCutManagerProps = {
  children?: React.ReactNode;
};

export const SortableCutManager = ({ children }: SortableCutManagerProps) => {
  const [activeCutRefStore] = useState(createActiveCutRefStore);
  const activeCutRef = useStore(activeCutRefStore, (state) => state.activeCutRef);

  return (
    <>
      <Stack flexDirection="row" sx={{ mb: 1 }}>
        {activeCutRef && (
          <>
            <Button variant="soft">여기서부터 유료</Button>
            <IconButton variant="soft">
              <MingcuteDelete3LineIcon />
            </IconButton>
          </>
        )}

        <Button variant="soft" color="primary" sx={{ ml: "auto" }}>
          이미지 추가
        </Button>
      </Stack>

      <ActiveCutRefContext.Provider value={activeCutRefStore}>{children}</ActiveCutRefContext.Provider>
    </>
  );
};
