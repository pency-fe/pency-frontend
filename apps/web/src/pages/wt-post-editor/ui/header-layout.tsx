"use client";

import { WtPostForm } from "@/features/wt-post-form";
import { Box, IconButton } from "@mui/material";
import { EvaArrowIosBackFillIcon } from "@pency/ui/components";
import { Header } from "@pency/ui/layouts";
import { useRouter } from "next/navigation";

export const HeaderLayout = () => {
  const router = useRouter();

  return (
    <Header
      slots={{
        left: (
          <IconButton onClick={router.back}>
            <EvaArrowIosBackFillIcon />
          </IconButton>
        ),
        right: (
          <Box sx={{ display: "flex", gap: "6px" }}>
            <WtPostForm.MoreIconButton />
            <WtPostForm.SaveButton />
            <WtPostForm.PublishButton />
          </Box>
        ),
      }}
    />
  );
};
