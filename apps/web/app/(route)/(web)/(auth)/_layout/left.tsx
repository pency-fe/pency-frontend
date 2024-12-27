"use client";

import { Box } from "@mui/material";
import { BrandPencyTextLogoIcon } from "@pency/ui/components";

export default function Left() {
  return (
    <Box component="a" href="/">
      <BrandPencyTextLogoIcon sx={{ width: "fit-content", height: "24px" }} />
    </Box>
  );
}
