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

                <WtPostGalleryFilterForm>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <WtPostGallerySort.FilterChip />

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "nowrap",
                        gap: 1,
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
                  {/* [TODO현지] 테스트하고 원래대로 꼭 돌려놔 */}
                  <WtPostGallery.Panel Menu={WtPostMenu} />

                  {/* <WtPostGallery.Panel Menu={WtPostMenu} /> */}
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
