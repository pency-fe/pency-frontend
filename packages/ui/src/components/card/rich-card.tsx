import { maxLine, noneUserSelect } from "@/util";
import {
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
import zIndex from "@mui/material/styles/zIndex";

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
    chips?: ReactElement | null;
  };
} & CardProps;

const RichCardFn = forwardRef<HTMLDivElement, RichCardFnProps>(({ slots, ...rest }, ref) => {
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
          ...noneUserSelect,
          ...rest.sx,
        }}
        onMouseEnter={setHoverTrue}
        onMouseLeave={setHoverFalse}
      >
        {slots.overlayElement}

        {slots.thumbnail}

        <Box sx={{ px: 1.5, py: 1.5 }}>
          {slots.labels && <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>{slots.labels}</Box>}

          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            {slots.avatarLink}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
              {slots.title}
              {slots.nameLink}
            </Box>
          </Box>

          {slots.chips && <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>{slots.chips}</Box>}
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

type ImageFnProps = Omit<BoxProps & LazyLoadImageProps, "children">;

const ImageFn = forwardRef<HTMLImageElement, ImageFnProps>((rest, ref) => {
  const { hover } = useValue("OverviewCard.Thumbnail.Image");
  const theme = useTheme();

  return (
    <Box
      ref={ref}
      component={LazyLoadImage}
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
      sx={{
        ...maxLine({ line: 2 }),
        ...rest.sx,
      }}
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
      variant="overline"
      underline="none"
      color={theme.vars.palette.text.secondary}
      {...rest}
      sx={{
        zIndex: 2,
        lineHeight: 1,
        transition: theme.transitions.create(["color"], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.shorter,
        }),
        ...maxLine({ line: 1 }),
        ["&:hover"]: {
          color: theme.vars.palette.text.primary,
        },
        ...rest.sx,
      }}
    />
  );
});

// ----------------------------------------------------------------------

type ChipFnProps = ChipProps & NextLinkProps;

const ChipFn = forwardRef<HTMLDivElement, ChipFnProps>((rest, ref) => {
  return <Chip ref={ref} component={NextLink} clickable {...rest} sx={{ zIndex: 2 }} />;
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
  Chip: ChipFn,
});
