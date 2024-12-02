"use client";

import { Stack } from "@mui/material";
import { Header, Main } from "@pency/ui/layouts";
import { HeaderLeft } from "./header-left";
import { HeaderRight } from "./header-right";
import { ViewerSection } from "./viewer-section";
import { BottomAppBar } from "./bottom-app-bar";
import { EtcSection } from "./etc-section";

// ----------------------------------------------------------------------

export function PostIdPage() {
  return (
    <>
      <Header slots={{ left: <HeaderLeft />, right: <HeaderRight /> }} />
      <Main>
        <Stack spacing={1} sx={{ maxWidth: "700px" }}>
          <ViewerSection />
          <EtcSection />
        </Stack>
      </Main>
      <BottomAppBar />
    </>
  );
}
