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
  clear: () => void;
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
    clear: () => set(() => ({ activeCuts: new Set() })),
  }));
};

const ActiveCutsContext = createContext<ReturnType<typeof createActiveCutsStore> | undefined>(undefined);

export function useActiveCutsContext<T>(selector: (state: ActiveCutsStore) => T): T {
  const context = useContext(ActiveCutsContext);

  if (!context) throw new Error(`부모로 <SortableCutManager /> 컴포넌트가 있어야 합니다.`);

  return useStore(context, selector);
}

// ----------------------------------------------------------------------

export const SortableCutManager = () => {
  const [activeCutsStore] = useState(createActiveCutsStore);
  const { activeCuts, clear } = useStore(activeCutsStore);
  const { watch, setValue } = useWTPostFormContext();

  const content = watch("content");

  const handleRemove = () => {
    let free = [...content.free];
    let paid = [...content.paid];

    for (const activeCut of activeCuts.values()) {
      free = free.filter(({ src }) => src !== activeCut);
      paid = paid.filter(({ src }) => src !== activeCut);
    }
    setValue("content", {
      free,
      paid,
    });
    clear();
  };

  return (
    <>
      <ActiveCutsContext.Provider value={activeCutsStore}>
        <Stack gap={1}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="soft" color="primary">
              업로드
            </Button>
            {activeCuts.size !== 0 && (
              <Button variant="soft" color="error" onClick={handleRemove}>
                삭제
              </Button>
            )}
          </Box>
          <Grid container wrap="nowrap" sx={{ width: 1, overflowX: "auto" }}>
            {[...content.free].map(({ src, name }, i) => (
              <Grid key={src} item xs={3.5} sm={2.5} sx={{ flexShrink: 0 }}>
                <SortableCut src={src} name={name} order={i + 1} />
              </Grid>
            ))}
            <Grid item xs={3.5} sm={2.5} sx={{ flexShrink: 0 }}>
              <SortablePaidBoundaryCut />
            </Grid>
            {[...content.paid].map(({ src, name }, i) => (
              <Grid key={src} item xs={3.5} sm={2.5} sx={{ flexShrink: 0 }}>
                <SortableCut src={src} name={name} order={i + content.free.length + 1} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </ActiveCutsContext.Provider>
    </>
  );
};
