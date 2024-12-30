"use client";

import { Stack, Box, Typography } from "@mui/material";
import { hideScrollX } from "@pency/ui/util";
import {
  WtPostCreationTypesStorageProvider,
  WtPostPairsStorageProvider,
  WtPostFilterFormToggleProvider,
  WtPostGenreProvider,
  WtPostSortProvider,
  WtPostGallery,
  WtPostGalleryCreationTypes,
  WtPostGalleryFilterForm,
  WtPostGalleryGenre,
  WtPostGalleryPairs,
  WtPostGallerySort,
} from "@/features/wt-post";

export function WtPostListPage() {
  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Typography variant="h4">웹툰 포스트</Typography>
        <WtPostGenreProvider>
          <WtPostSortProvider
            sortLabel={{
              LATEST: "최신순",
              POPULAR: "전체 인기순",
              WPOPULAR: "주간 인기순",
            }}
          >
            <WtPostCreationTypesStorageProvider>
              <WtPostPairsStorageProvider>
                <WtPostGalleryGenre />

                {/* TODO: GRID로 변경해야 함. 지금 영향 범위에 sort가 포함되고 있음. */}
                <WtPostFilterFormToggleProvider>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <WtPostGallerySort />

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "nowrap",
                        gap: 1,
                        overflowX: "scroll",
                        ...hideScrollX,
                      }}
                    >
                      <WtPostGalleryCreationTypes />
                      <WtPostGalleryPairs />
                    </Box>
                  </Box>
                  <WtPostGalleryFilterForm />
                </WtPostFilterFormToggleProvider>

                <WtPostGallery>
                  <Box sx={{ margin: "auto", mt: 3 }}>
                    <WtPostGallery.Pagination />
                  </Box>
                </WtPostGallery>
              </WtPostPairsStorageProvider>
            </WtPostCreationTypesStorageProvider>
          </WtPostSortProvider>
        </WtPostGenreProvider>
      </Stack>
    </Stack>
  );
}
