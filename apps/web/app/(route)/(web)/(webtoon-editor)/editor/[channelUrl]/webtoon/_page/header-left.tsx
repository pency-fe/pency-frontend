"use client";

import { IconButton } from "@mui/material";
import { EvaArrowIosBackFillIcon } from "@pency/ui/components";
import { useRouter } from "next/navigation";

export default function HeaderLeft() {
  const router = useRouter();

  return (
    <IconButton onClick={router.back} sx={{ width: "36px", height: "36px", overflow: "unset", cursor: "pointer" }}>
      <EvaArrowIosBackFillIcon />
    </IconButton>
  );
}
