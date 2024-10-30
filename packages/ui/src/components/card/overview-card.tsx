import { ReactElement, createContext, forwardRef, useContext, useMemo } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import {
  Avatar,
  AvatarProps,
  Box,
  BoxProps,
  ButtonBase,
  Card,
  CardProps,
  Link,
  LinkProps,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import { LazyLoadImage, LazyLoadImageProps } from "react-lazy-load-image-component";
import { useBooleanState } from "@pency/util";
import { Label } from "@/components/label";
import { maxLine, noneUserSelect } from "@/util";
import { ButtonBaseProps } from "@mui/material";

// ----------------------------------------------------------------------

const OverviewCardValueContext = createContext<{ hover: boolean } | undefined>(undefined);

function useValue(component: string) {
  const context = useContext(OverviewCardValueContext);

  if (!context) throw new Error(`<${component} />의 부모로 <OverviewCard /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

type OverviewCardFnProps = {
  slots: {
    overlayElement: ReactElement;
    thumbnail: ReactElement;
    labels?: ReactElement | null;
    avatarLink: ReactElement;
    title: ReactElement;
    nameLink: ReactElement;
  };
} & CardProps;

const OverviewCardFn = forwardRef<HTMLDivElement, OverviewCardFnProps>(({ slots, ...rest }, ref) => {
  const { bool: hover, setTrue: setHoverTrue, setFalse: setHoverFalse } = useBooleanState(false);

  const value = useMemo(() => ({ hover }), [hover]);

  return (
    <OverviewCardValueContext.Provider value={value}>
      <Card
        ref={ref}
        {...rest}
        sx={{ width: 1, boxShadow: "none", ...noneUserSelect, ...rest.sx }}
        onMouseEnter={setHoverTrue}
        onMouseLeave={setHoverFalse}
      >
        {/* 카드 버튼 */}
        {slots.overlayElement}

        {/* 썸네일 */}
        {slots.thumbnail}

        <Box sx={{ px: 1.5, py: 1.5 }}>
          {/* 라벨 */}
          {slots.labels && <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>{slots.labels}</Box>}

          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            {/* 아바타 */}
            {slots.avatarLink}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
              {/* 타이틀 */}
              {slots.title}

              {/* 이름 */}
              {slots.nameLink}
            </Box>
          </Box>
        </Box>
      </Card>
    </OverviewCardValueContext.Provider>
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
        overflow: "hidden",
        ...rest.sx,
      }}
    >
      {/* 이미지 */}
      {slots.image}

      {/* 오른쪽 상단 */}
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
      // https://mui.com/system/getting-started/the-sx-prop/#passing-the-sx-prop
      sx={[maxLine({ line: 1 }), ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])]}
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

export const OverviewCard = Object.assign(OverviewCardFn, {
  OverlayAnchor: OverlayAnchorFn,
  OverlayButton: OverlayButtonFn,
  Thumbnail: Object.assign(ThumbnailFn, {
    Image: ImageFn,
  }),
  Label: Label,
  AvatarLink: Object.assign(AvatarLinkFn, {
    Avatar: AvatarFn,
  }),
  Title: TitleFn,
  NameLink: NameLinkFn,
});
