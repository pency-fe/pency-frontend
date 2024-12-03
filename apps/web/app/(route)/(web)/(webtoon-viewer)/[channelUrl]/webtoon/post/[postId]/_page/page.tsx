"use client";

import { Slide, Stack, useScrollTrigger } from "@mui/material";
import { Header, Main } from "@pency/ui/layouts";
import { HeaderLeft } from "./header-left";
import { HeaderRight } from "./header-right";
import { ViewerSection } from "./viewer-section";
import { BottomAppBar } from "./bottom-app-bar";
import { EtcSection } from "./etc-section";
import { ReactElement } from "react";

// ----------------------------------------------------------------------

export function PostIdPage() {
  return (
    <>
      <HideTopAppBar />
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

// ----------------------------------------------------------------------

type HideOnScrollProps = {
  window?: () => Window;
  children?: ReactElement<unknown>;
};

function HideOnScroll({ children, window }: HideOnScrollProps) {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

function HideTopAppBar(props: HideOnScrollProps) {
  return (
    <HideOnScroll {...props}>
      <Header slots={{ left: <HeaderLeft />, right: <HeaderRight /> }} />
    </HideOnScroll>
  );
}
