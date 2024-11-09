import { hideScrollY, varAlpha } from "@/util";
import { Box, BoxProps, ButtonBaseProps, Stack, StackProps, useTheme } from "@mui/material";
import { forwardRef } from "react";

// ----------------------------------------------------------------------

type UlProps = BoxProps<"ul">;

const Ul = forwardRef<HTMLUListElement, UlProps>((props, ref) => {
  return (
    <Box
      ref={ref}
      component="ul"
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto",
        gap: `var(${navToken.ul.gap})`,
        ...props.sx,
      }}
    />
  );
});

type LiProps = BoxProps<"li">;

const Li = forwardRef<HTMLLIElement, LiProps>((props, ref) => {
  return (
    <Box
      ref={ref}
      component="li"
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        ...props.sx,
      }}
    />
  );
});

// ----------------------------------------------------------------------

const navToken = {
  ul: {
    gap: "--nav-ul-gap",
  },
  leaf: {
    iconSize: "--nav-leaf-icon-size",
    minHeight: "--nav-leaf-height",
    color: "--nav-leaf-color",
    activeColor: "--nav-leaf-active-color",
    bgcolor: "--nav-leaf-bgcolor",
    hoverBgcolor: "--nav-leaf-hover-bgcolor",
    activeBgcolor: "--nav-leaf-active-bgcolor",
    hoverActiveBgcolor: "--nav-leaf-hover-active-bgcolor",
  },
} as const;

type NavFnProps = {
  children?: React.ReactNode;
} & StackProps;
const NavFn = forwardRef<HTMLElement, NavFnProps>(({ children, ...rest }, ref) => {
  const theme = useTheme();

  return (
    <Stack
      ref={ref}
      component="nav"
      {...rest}
      sx={{
        flex: "1 1 auto",
        ...hideScrollY,
        [navToken.ul.gap]: theme.spacing(0.5),
        [navToken.leaf.iconSize]: "24px",
        [navToken.leaf.minHeight]: "44px",
        [navToken.leaf.color]: theme.vars.palette.text.secondary,
        [navToken.leaf.activeColor]: theme.vars.palette.primary.main,
        [navToken.leaf.bgcolor]: "transparent",
        [navToken.leaf.hoverBgcolor]: theme.vars.palette.action.hover,
        [navToken.leaf.activeBgcolor]: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
        [navToken.leaf.hoverActiveBgcolor]: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
        ...rest.sx,
      }}
    >
      <Ul>{children}</Ul>
    </Stack>
  );
});

// ----------------------------------------------------------------------

type TreeFnProps = LiProps;

const TreeFn = forwardRef<HTMLLIElement, TreeFnProps>(({ children, ...rest }, ref) => {
  return (
    <Li {...rest}>
      <Ul>{children}</Ul>
    </Li>
  );
});

// ----------------------------------------------------------------------

type BranchFnProps = LiProps;

const BranchFn = forwardRef<HTMLLIElement, BranchFnProps>(({ children, ...rest }, ref) => {
  return (
    <Li {...rest}>
      <Ul>{children}</Ul>
    </Li>
  );
});

// ----------------------------------------------------------------------

const AnchorLeafFn;

const ButtonLeafFn;

// ----------------------------------------------------------------------

const ButtonBranchFn;

const AnchorBranchFn;

// ----------------------------------------------------------------------

type LeafFnProps = {
  icon: React.ReactElement;
  label: string;
  arrow: "forward" | "downward" | "none";
} & ButtonBaseProps;

const Leaf = forwardRef<HTMLButtonElement, LeafFnProps>((props, ref) => {
  const theme = useTheme();
  const iconStyles = useMemo(
    () => ({
      flexShrink: 0,
      display: "inline-flex",
      width: "16px",
      height: "16px",
      marginLeft: "6px",
    }),
    [],
  );

  return (
    <ButtonBase
      LinkComponent={Link}
      {...(data.href && { href: data.href })}
      sx={{
        width: "100%",
        minHeight: `var(${navToken.leaf.minHeight})`,
        padding: theme.spacing(0.5, 1, 0.5, 1.5),
        borderRadius: `${theme.shape.borderRadius}px`,
        bgcolor: `var(${navToken.leaf.bgcolor})`,
        color: `var(${navToken.leaf.color})`,
        textAlign: "start",
        "&:hover": {
          bgcolor: `var(${navToken.leaf.hoverBgcolor})`,
        },
        ...(active && {
          color: `var(${navToken.leaf.activeColor})`,
          bgcolor: `var(${navToken.leaf.activeBgcolor})`,
          "&:hover": {
            bgcolor: `var(${navToken.leaf.hoverActiveBgcolor})`,
          },
        }),
        ...sx,
      }}
      {...rest}
    >
      {data.icon ? (
        <Box
          component="span"
          sx={{
            flexShrink: 0,
            display: "inline-flex",
            width: `var(${navToken.leaf.iconSize})`,
            height: `var(${navToken.leaf.iconSize})`,
            margin: theme.spacing(0, 1.5, 0, 0),
            marginTop: "-2px",
          }}
        >
          {data.icon}
        </Box>
      ) : null}

      <Box component="span" sx={{ minWidth: 0, flex: "1 1 auto" }}>
        <Box
          component="span"
          sx={{
            width: "100%",
            maxWidth: "100%",
            display: "block",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            ...theme.typography.body1,
            fontWeight: active ? theme.typography.fontWeightSemiBold : theme.typography.fontWeightMedium,
          }}
        >
          {data.title}
        </Box>
      </Box>
      {arrow !== "none" && arrow === "downward" && <EvaArrowIosDownwardFillIcon sx={iconStyles} />}
      {arrow !== "none" && arrow === "forward" && <EvaArrowIosForwardFillIcon sx={iconStyles} />}
    </ButtonBase>
  );
});
