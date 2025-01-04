"use client";

import { Stack, Box, Typography } from "@mui/material";
import { hideScrollX } from "@pency/ui/util";
import {
  WtPostGallery,
  WtPostGalleryCreationTypes,
  WtPostGalleryFilterForm,
  WtPostGalleryGenre,
  WtPostGalleryPairs,
  WtPostGallerySort,
  WtPostMenu,
} from "@/features/wt-post";

export function WtPostListPage() {
  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Typography variant="h4">웹툰 포스트</Typography>
        <WtPostGalleryGenre>
          <WtPostGallerySort
            sortLabel={{
              LATEST: "최신순",
              POPULAR: "전체 인기순",
              WPOPULAR: "주간 인기순",
            }}
          >
            <WtPostGalleryCreationTypes variant="storage">
              <WtPostGalleryPairs variant="storage">
                <WtPostGalleryGenre.RadioButtons />

                {/* TODO: GRID로 변경해야 함. 지금 영향 범위에 sort가 포함되고 있음. */}
                <WtPostGalleryFilterForm>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <WtPostGallerySort.FilterChip />

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
                      <WtPostGalleryCreationTypes.FilterChip />
                      <WtPostGalleryPairs.FilterChip />
                    </Box>
                  </Box>
                  <WtPostGalleryFilterForm.CollapseForm />
                </WtPostGalleryFilterForm>

                <WtPostGallery>
                  <WtPostGallery.Panel Menu={WtPostMenu} />
                  <Box sx={{ margin: "auto", mt: 3 }}>
                    <WtPostGallery.Pagination />
                  </Box>
                </WtPostGallery>
              </WtPostGalleryPairs>
            </WtPostGalleryCreationTypes>
          </WtPostGallerySort>
        </WtPostGalleryGenre>
      </Stack>
    </Stack>
  );
}
