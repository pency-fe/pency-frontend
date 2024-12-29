"use client";

import { stylesColorScheme } from "../../util";
import { Button, ButtonProps, Grid, Typography, TypographyProps, useTheme } from "@mui/material";
import { CardCarouselProvider } from "./card-carousel-provider";

// ----------------------------------------------------------------------

type CardCarouselTemplateFnProps = {
  slots: {
    title: React.ReactElement;
    moreButton: React.ReactElement;
    prevNextNav: React.ReactElement;
    cardCarousel: React.ReactElement;
  };
};

const CardCarouselTemplateFn = ({ slots }: CardCarouselTemplateFnProps) => {
  return (
    <Grid container>
      <Grid item xs="auto">
        {slots.title}
      </Grid>
      <CardCarouselProvider>
        <Grid item xs sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1 }}>
          {slots.moreButton}
          {slots.prevNextNav}
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          {slots.cardCarousel}
        </Grid>
      </CardCarouselProvider>
    </Grid>
  );
};

// ----------------------------------------------------------------------

type CardTabCarouselTemplateFnProps = {
  slots: {
    title: React.ReactElement;
    tabs: React.ReactElement;
    moreButton: React.ReactElement;
    prevNextNav: React.ReactElement;
    cardCarousel: React.ReactElement;
  };
};

const CardTabCarouselTemplateFn = ({ slots }: CardTabCarouselTemplateFnProps) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        {slots.title}
      </Grid>
      <CardCarouselProvider>
        <Grid item xs="auto" sx={{ mt: 1 }}>
          {slots.tabs}
        </Grid>
        <Grid item xs sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 0.5 }}>
          {slots.moreButton}
          {slots.prevNextNav}
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }}>
          {slots.cardCarousel}
        </Grid>
      </CardCarouselProvider>
    </Grid>
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
  return children;
};

// ----------------------------------------------------------------------

export const CardCarouselTemplate = Object.assign(CardCarouselTemplateFn, {
  Title: TitleFn,
  MoreButton: MoreButtonFn,
});

export const CardTabCarouselTemplate = Object.assign(CardTabCarouselTemplateFn, {
  Title: TitleFn,
  Tabs: TabsFn,
  MoreButton: MoreButtonFn,
});
