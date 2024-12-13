"use client";

import { IcomoonFreeYoutube2Icon } from "@pency/ui/components";
import { Box } from "@mui/material";

export function Left() {
  return (
    <Box component="a" href="/" sx={{ color: "inherit" }}>
      <IcomoonFreeYoutube2Icon sx={{ width: "fit-content", height: "24px", overflow: "unset", cursor: "pointer" }} />
    </Box>
  );
}
