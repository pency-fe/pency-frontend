"use client";

import { EvaMenuOutlineIcon, IcomoonFreeYoutube2Icon } from "@pency/ui/components";
import { Box, IconButton } from "@mui/material";

export function Left() {
  return (
    <>
      <IconButton>
        <EvaMenuOutlineIcon />
      </IconButton>
      <Box component="a" href="/" sx={{ color: "inherit" }}>
        <IcomoonFreeYoutube2Icon sx={{ width: "fit-content", height: "24px", overflow: "unset", cursor: "pointer" }} />
      </Box>
    </>
  );
}
