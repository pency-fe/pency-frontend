"use client";

import { Box, Button, Grid, Stack } from "@mui/material";
import { createContext, useContext, useState } from "react";
import { createStore, useStore } from "zustand";
import { useWTPostFormContext } from "./wt-post-form";
import { SortableCut, SortablePaidBoundaryCut } from "./sortable-cut";

// ----------------------------------------------------------------------

type ActiveCutsStore = {
  activeCuts: Set<string>;
  toggleActiveCut: (src: string) => void;
};

const createActiveCutsStore = () => {
  return createStore<ActiveCutsStore>()((set) => ({
    activeCuts: new Set(),
    toggleActiveCut: (src) => {
      set(({ activeCuts }) => {
        const newActiveCuts = new Set(activeCuts);

        if (newActiveCuts.has(src)) {
          newActiveCuts.delete(src);
        } else {
          newActiveCuts.add(src);
        }

        return {
          activeCuts: newActiveCuts,
        };
      });
    },
  }));
};

const ActiveCutRefContext = createContext<ReturnType<typeof createActiveCutsStore> | undefined>(undefined);

export function useActiveCutsContext<T>(selector: (state: ActiveCutsStore) => T): T {
  const context = useContext(ActiveCutRefContext);

  if (!context) throw new Error(`부모로 <SortableCutManager /> 컴포넌트가 있어야 합니다.`);

  return useStore(context, selector);
}

// ----------------------------------------------------------------------

export const SortableCutManager = () => {
  const [activeCutsStore] = useState(createActiveCutsStore);
  const activeCuts = useStore(activeCutsStore, (state) => state.activeCuts);
  const { getValues } = useWTPostFormContext();

  return (
    <>
      <ActiveCutRefContext.Provider value={activeCutsStore}>
        <Stack gap={1}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="soft" color="primary">
              업로드
            </Button>
            {activeCuts.size !== 0 && (
              <Button variant="soft" color="error">
                삭제
              </Button>
            )}
          </Box>
          <Grid container wrap="nowrap" sx={{ width: 1, overflowX: "auto" }}>
            {getValues("content").map(({ src, name }, i) => (
              <Grid key={src} item xs={3.5} sm={2.5} sx={{ flexShrink: 0 }}>
                <SortableCut src={src} name={name} order={i + 1} />
              </Grid>
            ))}
            <Grid item xs={3.5} sm={2.5} sx={{ flexShrink: 0 }}>
              <SortablePaidBoundaryCut />
            </Grid>
          </Grid>
        </Stack>
      </ActiveCutRefContext.Provider>
    </>
  );
};
