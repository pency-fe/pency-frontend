"use client";

import { stylesColorScheme } from "@/util";
import { Box, Button, ButtonProps, Grid, Stack, Typography, TypographyProps, useTheme } from "@mui/material";

// ----------------------------------------------------------------------

type OverviewCardCtemplateFnProps = {
  OverviewCarousel: (...args: any[]) => React.ReactElement;
  slots: {
    title: React.ReactElement;
    moreButton: React.ReactElement;
    prevNextNav: React.ReactElement;
    overviewCarouselContainer: React.ReactElement;
  };
};

const OverviewCardCtemplateFn = ({ OverviewCarousel, slots }: OverviewCardCtemplateFnProps) => {
  return (
    <Grid container>
      <Grid item xs="auto">
        {slots.title}
      </Grid>
      <OverviewCarousel>
        <Grid item xs sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1 }}>
          {slots.moreButton}
          {slots.prevNextNav}
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          {slots.overviewCarouselContainer}
        </Grid>
      </OverviewCarousel>
    </Grid>
  );
};

// ----------------------------------------------------------------------

type OverviewCardTCtemplateFnProps = {
  OverviewCarousel: (...args: any[]) => React.ReactElement;
  slots: {
    title: React.ReactElement;
    tabs: React.ReactElement;
    moreButton: React.ReactElement;
    prevNextNav: React.ReactElement;
    overviewCarouselContainer: React.ReactElement;
  };
};

const OverviewCardTCtemplateFn = ({ slots }: OverviewCardTCtemplateFnProps) => {
  return (
    <Stack spacing={1}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>{slots.title}</Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {slots.tabs}
        <Box sx={{ display: "flex", alignItems: "center", ml: "auto", gap: 1 }}>
          {slots.moreButton}
          {slots.prevNextNav}
        </Box>
      </Box>
      {slots.overviewCarouselContainer}
    </Stack>
  );
};

// ----------------------------------------------------------------------

type TitleFnProps = TypographyProps;

const TitleFn = (rest: TitleFnProps) => {
  return <Typography variant="h4" {...rest} />;
};

// ----------------------------------------------------------------------

type MoreButtonFnProps = ButtonProps;

const MoreButtonFn = (rest: MoreButtonFnProps) => {
  const theme = useTheme();

  return (
    <Button
      size="small"
      color="inherit"
      {...rest}
      sx={{
        color: theme.vars.palette.grey[500],
        [stylesColorScheme.dark]: {
          color: theme.vars.palette.grey[500],
        },
        ...rest.sx,
      }}
    >
      더 보기
    </Button>
  );
};

// ----------------------------------------------------------------------

const TabsFn = ({ children }: { children?: React.ReactNode }) => {
  return <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>{children}</Box>;
};

// ----------------------------------------------------------------------

const PrevNextNavFn = ({ children }: { children?: React.ReactNode }) => {
  return children;
};

// ----------------------------------------------------------------------

const OverviewCarouselContainerFn = ({ children }: { children?: React.ReactNode }) => {
  return children;
};

// ----------------------------------------------------------------------

export const OverviewCardCtemplate = Object.assign(OverviewCardCtemplateFn, {
  Title: TitleFn,
  MoreButton: MoreButtonFn,
  PrevNextNav: PrevNextNavFn,
  OverviewCarouselContainer: OverviewCarouselContainerFn,
});

export const OverviewCardTCtemplate = Object.assign(OverviewCardTCtemplateFn, {
  Title: TitleFn,
  Tabs: TabsFn,
  MoreButton: MoreButtonFn,
  PrevNextNav: PrevNextNavFn,
  OverviewCarouselContainer: OverviewCarouselContainerFn,
});
