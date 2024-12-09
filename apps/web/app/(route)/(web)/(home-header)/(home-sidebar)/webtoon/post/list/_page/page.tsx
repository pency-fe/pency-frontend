"use client";

import { Stack, Box, Typography } from "@mui/material";
import { hideScrollX } from "@pency/ui/util";
import { WT_Post_PageContent, WT_Post_PageFilter, WT_Post_PageOrder, WT_Post_PageTab } from "_core/webtoon/post";

export function ListPage() {
  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Typography variant="h4">웹툰 포스트</Typography>
        <WT_Post_PageTab>
          <WT_Post_PageOrder>
            <WT_Post_PageFilter>
              <WT_Post_PageTab.GenreTab />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <WT_Post_PageOrder.Order />

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
                  <WT_Post_PageFilter.CreationTypesFilter />
                  <WT_Post_PageFilter.PairsFilter />
                </Box>
              </Box>
              <WT_Post_PageFilter.FilterForm />

              <WT_Post_PageContent>
                <WT_Post_PageContent.Page />
                <Box sx={{ margin: "auto", mt: 3 }}>
                  <WT_Post_PageContent.Pagination />
                </Box>
              </WT_Post_PageContent>
            </WT_Post_PageFilter>
          </WT_Post_PageOrder>
        </WT_Post_PageTab>
      </Stack>
    </Stack>
  );
}
