"use client";

import { Box, IconButton } from "@mui/material";
import { EvaBookmarkOutlineIcon, EvaMoreVerticalOutlineIcon } from "@pency/ui/components";

export function HeaderRight() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton sx={{ fontSize: 24 }}>
        <EvaBookmarkOutlineIcon />
      </IconButton>
      <IconButton sx={{ fontSize: 24 }}>
        <EvaMoreVerticalOutlineIcon />
      </IconButton>
    </Box>
  );
}
