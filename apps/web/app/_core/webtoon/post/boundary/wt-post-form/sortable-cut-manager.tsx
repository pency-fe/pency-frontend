import { UniqueIdentifier } from "@dnd-kit/core";
import { createContext, useCallback, useContext, useState } from "react";
import { createStore, useStore } from "zustand";
import { useWTPostFormContext } from "./wt-post-form";
import { arrayMove } from "@dnd-kit/sortable";
import { Button } from "@mui/material";

// ----------------------------------------------------------------------

type ActiveCutStore = {
  activeCut: string | null;
  handleActiveCut: (cut: string) => void;
};

const createActiveCutStore = () => {
  return createStore<ActiveCutStore>()((set) => ({
    activeCut: null,
    handleActiveCut: (cut) => {
      set(({ activeCut }) => ({
        activeCut: cut !== activeCut ? cut : null,
      }));
    },
  }));
};

const ActiveCutContext = createContext<ReturnType<typeof createActiveCutStore> | undefined>(undefined);

export function useActiveCutContext<T>(selector: (state: ActiveCutStore) => T): T {
  const context = useContext(ActiveCutContext);

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
  const [activeCutStore] = useState(createActiveCutStore);
  const activeCut = useStore(activeCutStore, (state) => state.activeCut);
  const { getValues, setValue } = useWTPostFormContext();

  const moveCutLeft: CutHandler["moveCutLeft"] = (cut: string) => {
    const oldIndex = getValues("content").findIndex((item) => item === cut);
    const newIndex = oldIndex - 1;
    console.log(oldIndex, newIndex);

    if (newIndex === -1) {
      return;
    }

    setValue("content", arrayMove(getValues("content"), oldIndex, newIndex));
    console.log(getValues("content"));
  };

  // const moveCutRight = useCallback(() => {}, []);

  return (
    <>
      {activeCut && <Button onClick={() => moveCutLeft(activeCut)}>left</Button>}

      <ActiveCutContext.Provider value={activeCutStore}>
        <CutHandlerContext.Provider value={{ moveCutLeft }}>{children}</CutHandlerContext.Provider>
      </ActiveCutContext.Provider>
    </>
  );
};
