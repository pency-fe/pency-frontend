"use client";

import { Box, Grid } from "@mui/material";
import { PlatformProvider, usePlatform } from "../../model/platform-provider";
import { LibraryPlatformFilterChip } from "../library-platform-filter-chip";
import { hideScrollX } from "@pency/ui/util";
import {
  WtPostGallery,
  WtPostGalleryCreationTypes,
  WtPostGalleryFilterForm,
  WtPostGalleryPairs,
  WtPostMenu,
} from "@/features/wt-episode";

const LibraryBookmarkPageFn = () => {
  const { platform } = usePlatform();

  return (
    <Grid container>
      <Grid item xs="auto">
        <LibraryPlatformFilterChip />
      </Grid>

      {platform === "WEBTOON" ? (
        <WtPostGalleryCreationTypes>
          <WtPostGalleryPairs>
            <WtPostGalleryFilterForm>
              <Grid item xs sx={{ display: "flex", gap: 1, pl: 1, ...hideScrollX }}>
                <WtPostGalleryCreationTypes.FilterChip />
                <WtPostGalleryPairs.FilterChip />
              </Grid>

              <Grid item xs={12}>
                <WtPostGalleryFilterForm.CollapseForm sx={{ mt: 2 }} />
              </Grid>
            </WtPostGalleryFilterForm>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <WtPostGallery>
                <WtPostGallery.Panel Menu={WtPostMenu} />

                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <WtPostGallery.Pagination />
                </Box>
              </WtPostGallery>
            </Grid>
          </WtPostGalleryPairs>
        </WtPostGalleryCreationTypes>
      ) : null}
    </Grid>
  );
};

export const LibraryBookmarkPage = () => {
  return (
    <PlatformProvider>
      <LibraryBookmarkPageFn />
    </PlatformProvider>
  );
};
