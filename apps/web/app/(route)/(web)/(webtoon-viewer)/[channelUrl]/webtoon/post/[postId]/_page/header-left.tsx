"use client";

import { Box, IconButton, Typography } from "@mui/material";
import { EvaArrowIosBackFillIcon } from "@pency/ui/components";
import { maxLine } from "@pency/ui/util";

export function HeaderLeft() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton sx={{ fontSize: 24 }}>
        <EvaArrowIosBackFillIcon />
      </IconButton>
      <Typography variant="h6" sx={{ ...maxLine({ line: 1 }) }}>
        포스트 제목 포스트 제목 포스트 제목 포스트 제목 포스트 제목 포스트 제목
      </Typography>
    </Box>
  );
}
