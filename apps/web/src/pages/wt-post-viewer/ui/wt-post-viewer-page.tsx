"use client";

import { Slide, Stack, useScrollTrigger } from "@mui/material";
import { Header, Main } from "@pency/ui/layouts";
import { HeaderLeft } from "./header-left";
import { HeaderRight } from "./header-right";
import { ViewerSection } from "./viewer-section";
import { BottomAppBar } from "./bottom-app-bar";
import { EtcSection } from "./etc-section";
import { isClient } from "@pency/util";

// ----------------------------------------------------------------------

export const WtPostViewerPage = () => {
  return (
    <>
      <HideHeader />
      <Main>
        <Stack spacing={1} sx={{ maxWidth: "700px" }}>
          <ViewerSection />
          <EtcSection />
        </Stack>
      </Main>
      <BottomAppBar />
    </>
  );
};

// ----------------------------------------------------------------------

function HideHeader() {
  const trigger = useScrollTrigger({
    target: isClient() ? window : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <Header slots={{ left: <HeaderLeft />, right: <HeaderRight /> }} />
    </Slide>
  );
}
