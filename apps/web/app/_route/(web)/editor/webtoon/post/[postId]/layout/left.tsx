"use client";

import { IconButton } from "@mui/material";
import { EvaArrowIosBackFillIcon } from "@pency/ui/components";

export default function Left() {
  const handleHomeClick = () => {
    window.history.back();
  };

  return (
    <IconButton onClick={handleHomeClick} sx={{ width: "24px", height: "24px", overflow: "unset", cursor: "pointer" }}>
      <EvaArrowIosBackFillIcon />
    </IconButton>
  );
}
