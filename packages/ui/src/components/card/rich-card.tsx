"use client";

import { hideScrollY, iconAlignCenter, maxLine, varAlpha } from "@/util";
import {
  Accordion,
  AccordionDetails,
  AccordionDetailsProps,
  AccordionProps,
  AccordionSummary,
  accordionSummaryClasses,
  AccordionSummaryProps,
  Avatar,
  AvatarProps,
  Box,
  BoxProps,
  ButtonBase,
  ButtonBaseProps,
  Card,
  CardProps,
  Chip,
  ChipProps,
  IconButton,
  IconButtonProps,
  Link,
  LinkProps,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import { useBooleanState } from "@pency/util";
import { createContext, forwardRef, ReactElement, useContext, useMemo } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { LazyLoadImageProps, LazyLoadImage } from "react-lazy-load-image-component";
import { Label } from "../label";
import { BrandPencyTextIcon } from "../svg";

// ----------------------------------------------------------------------

const RichCardValueContext = createContext<{ hover: boolean } | undefined>(undefined);

function useValue(component: string) {
  const context = useContext(RichCardValueContext);

  if (!context) {
    throw new Error(`<${component} />의 부모로 <RichCard /> 컴포넌트가 있어야 합니다.`);
  }

  return context;
}

// ----------------------------------------------------------------------

type RichCardFnProps = {
  slots: {
    overlayElement: ReactElement;
    thumbnail: ReactElement;
    labels?: ReactElement | null;
    avatarLink: ReactElement;
    title: ReactElement;
    nameLink: ReactElement;
    attributes?: ReactElement | null;
    feedbackButton?: ReactElement | null;
    chips?: ReactElement | null;
    accordion?: ReactElement | null;
  };
} & CardProps;

const RichCardFn = forwardRef<HTMLDivElement, RichCardFnProps>(({ slots, ...rest }, ref) => {
  const theme = useTheme();
  const { bool: hover, setTrue: setHoverTrue, setFalse: setHoverFalse } = useBooleanState(false);

  const value = useMemo(() => ({ hover }), [hover]);

  return (
    <RichCardValueContext.Provider value={value}>
      <Card
        ref={ref}
        {...rest}
        sx={{
          backgroundColor: "transparent",
          width: 1,
          boxShadow: "none",
          borderRadius: 0,
          ...rest.sx,
        }}
        onMouseEnter={setHoverTrue}
        onMouseLeave={setHoverFalse}
      >
        {slots.overlayElement}

        {slots.thumbnail}

        <Box sx={{ px: 0.5, py: 1.5 }}>
          {slots.labels && <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>{slots.labels}</Box>}

          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              {slots.avatarLink}

              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
                {slots.title}
                <Typography
                  variant="overline"
                  sx={{
                    color: theme.vars.palette.text.secondary,
                    lineHeight: 1,
                    "& svg": {
                      mr: theme.spacing(0.25),
                      ...iconAlignCenter,
                    },
                  }}
                >
                  {slots.nameLink}
                  {slots.attributes}
                </Typography>
              </Box>
            </Box>
            {slots.feedbackButton}
          </Box>

          {slots.chips && (
            <Box
              sx={{ display: "flex", flexWrap: "nowrap", marginTop: 1.5, gap: 1, overflow: "scroll", ...hideScrollY }}
            >
              {slots.chips}
            </Box>
          )}

          {slots.accordion && <Box sx={{ marginTop: 1.5 }}>{slots.accordion}</Box>}
        </Box>
      </Card>
    </RichCardValueContext.Provider>
  );
});

// ----------------------------------------------------------------------

type OverlayButtonFnProps = ButtonBaseProps<"button">;

const OverlayButtonFn = forwardRef<HTMLButtonElement, OverlayButtonFnProps>((rest, ref) => {
  return (
    <ButtonBase
      ref={ref}
      disableRipple
      {...rest}
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        ...rest.sx,
      }}
    />
  );
});

type OverlayAnchorFnProps = ButtonBaseProps<"a"> & NextLinkProps;

const OverlayAnchorFn = forwardRef<HTMLAnchorElement, OverlayAnchorFnProps>((rest, ref) => {
  return (
    <ButtonBase
      ref={ref}
      LinkComponent={NextLink}
      disableRipple
      {...rest}
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        ...rest.sx,
      }}
    />
  );
});

// ----------------------------------------------------------------------

type ThumbnailFnProps = Omit<
  {
    slots: {
      image: ReactElement;
      topEnds?: ReactElement | null;
    };
  } & BoxProps,
  "children"
>;

const ThumbnailFn = forwardRef<HTMLDivElement, ThumbnailFnProps>(({ slots, ...rest }, ref) => {
  const theme = useTheme();

  return (
    <Box
      ref={ref}
      {...rest}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 1,
        borderRadius: 2,
        overflow: "hidden",
        ...rest.sx,
      }}
    >
      {slots.image}

      {slots.topEnds && (
        <Box
          sx={{
            position: "absolute",
            top: theme.spacing(0.75),
            right: theme.spacing(0.75),
            display: "flex",
            gap: theme.spacing(0.5),
          }}
        >
          {slots.topEnds}
        </Box>
      )}
    </Box>
  );
});

type ImageFnProps = Omit<BoxProps<"img", LazyLoadImageProps>, "children" | "src"> & { src?: string | null };

const ImageFn = forwardRef<HTMLImageElement, ImageFnProps>(({ src, ...rest }, ref) => {
  const { hover } = useValue("OverviewCard.Thumbnail.Image");
  const theme = useTheme();

  return (
    <>
      {src ? (
        <Box
          ref={ref}
          component={LazyLoadImage}
          src={src}
          {...rest}
          sx={{
            width: 1,
            objectFit: "cover",
            transition: theme.transitions.create("transform", {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.shorter,
            }),
            ...(hover && {
              transform: "scale(1.05)",
            }),
            ...rest.sx,
          }}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 1,
            height: 1,
            bgcolor: varAlpha(theme.vars.palette.grey["500Channel"], 0.16),
          }}
        >
          <BrandPencyTextIcon sx={{ width: "25%", height: "auto" }} />
        </Box>
      )}
    </>
  );
});

// ----------------------------------------------------------------------

type AvatarLinkFnProps = { slots: { avatar: ReactElement } } & LinkProps & NextLinkProps;

const AvatarLinkFn = forwardRef<HTMLAnchorElement, AvatarLinkFnProps>(({ slots, ...rest }, ref) => {
  return (
    <Link ref={ref} component={NextLink} {...rest} sx={{ zIndex: 2, ...rest.sx }}>
      {slots.avatar}
    </Link>
  );
});

type AvatarFnProps = AvatarProps;

const AvatarFn = forwardRef<HTMLDivElement, AvatarFnProps>((rest, ref) => {
  return <Avatar ref={ref} {...rest} sx={{ width: 36, height: 36, ...rest.sx }} />;
});

// ----------------------------------------------------------------------

type TitleFnProps = TypographyProps;

const TitleFn = forwardRef<HTMLHeadingElement, TitleFnProps>((rest, ref) => {
  return (
    <Typography
      ref={ref}
      variant="subtitle2"
      color="inherit"
      {...rest}
      sx={[maxLine({ line: 2 }), ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])]}
    />
  );
});

// ----------------------------------------------------------------------

type NameLinkFnProps = LinkProps & NextLinkProps;

const NameLinkFn = forwardRef<HTMLAnchorElement, NameLinkFnProps>((rest, ref) => {
  const theme = useTheme();

  return (
    <Link
      ref={ref}
      component={NextLink}
      underline="none"
      color="inherit"
      {...rest}
      sx={{
        position: "relative",
        zIndex: 2,
        transition: theme.transitions.create(["color"], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.shorter,
        }),
        ["&:hover"]: {
          color: theme.vars.palette.text.primary,
        },
        ...rest.sx,
      }}
    />
  );
});

// ----------------------------------------------------------------------

type AttributeFnProps = TypographyProps;

const AttributeFn = forwardRef<HTMLSpanElement, AttributeFnProps>((rest, ref) => {
  return (
    <Typography
      component="span"
      ref={ref}
      {...rest}
      variant="inherit"
      sx={{
        lineHeight: 1,
        ...rest.sx,
      }}
    />
  );
});

type DotFnProps = TypographyProps;

const AttributeDotFn = forwardRef<HTMLSpanElement, DotFnProps>((rest, ref) => {
  const theme = useTheme();

  return (
    <Typography
      component="span"
      variant="inherit"
      ref={ref}
      {...rest}
      sx={{ lineHeight: 1, mx: theme.spacing(0.5), ...rest.sx }}
    >
      •
    </Typography>
  );
});

// ----------------------------------------------------------------------

type FeedbackButtonFnProps = IconButtonProps;

const FeedbackButtonFn = forwardRef<HTMLButtonElement, FeedbackButtonFnProps>((rest, ref) => {
  return <IconButton ref={ref} {...rest} sx={{ zIndex: 2, ...rest.sx }} />;
});

// ----------------------------------------------------------------------

type ChipFnProps = ChipProps & NextLinkProps;

const ChipFn = forwardRef<HTMLDivElement, ChipFnProps>((rest, ref) => {
  return <Chip ref={ref} component={NextLink} clickable {...rest} sx={{ zIndex: 2, borderRadius: 3, ...rest.sx }} />;
});

// ----------------------------------------------------------------------

type AccordionFnProps = Omit<
  {
    slots: {
      summary: ReactElement;
      details: ReactElement;
    };
  } & AccordionProps,
  "children"
>;

const AccordionFn = forwardRef<HTMLDivElement, AccordionFnProps>(({ slots, ...rest }, ref) => {
  const theme = useTheme();

  return (
    <Accordion
      ref={ref}
      disableGutters
      {...rest}
      sx={{
        zIndex: 3,
        backgroundColor: theme.vars.palette.background.paper,
        ...rest.sx,
      }}
    >
      {slots.summary}
      {slots.details}
    </Accordion>
  );
});

type SummaryFnProps = AccordionSummaryProps;

const SummaryFn = forwardRef<HTMLDivElement, SummaryFnProps>((rest, ref) => {
  const theme = useTheme();

  return (
    <AccordionSummary
      ref={ref}
      {...rest}
      sx={{
        color: theme.vars.palette.text.primary,
        minHeight: "fit-content",
        ...theme.typography.caption,
        fontWeight: theme.typography.fontWeightMedium,

        [`& .${accordionSummaryClasses.content}`]: {
          my: "6px",
        },
        ...rest.sx,
      }}
    />
  );
});

type DetailsFnProps = AccordionDetailsProps;

const DetailsFn = forwardRef<HTMLDivElement, DetailsFnProps>((rest, ref) => {
  const theme = useTheme();
  return (
    <AccordionDetails
      ref={ref}
      {...rest}
      sx={{
        color: theme.vars.palette.text.secondary,
        pt: 0,
        ...theme.typography.body2,
        ...rest.sx,
      }}
    />
  );
});

// ----------------------------------------------------------------------

export const RichCard = Object.assign(RichCardFn, {
  OverlayAnchor: OverlayAnchorFn,
  OverlayButton: OverlayButtonFn,
  Thumbnail: Object.assign(ThumbnailFn, { Image: ImageFn }),
  Label: Label,
  AvatarLink: Object.assign(AvatarLinkFn, { Avatar: AvatarFn }),
  Title: TitleFn,
  NameLink: NameLinkFn,
  Attribute: AttributeFn,
  AttributeDot: AttributeDotFn,
  FeedbackButton: FeedbackButtonFn,
  Chip: ChipFn,
  Accordion: Object.assign(AccordionFn, { Summary: SummaryFn, Details: DetailsFn }),
});
