import { EvaArrowIosDownwardFillIcon, EvaArrowIosForwardFillIcon } from "@/components/svg";
import { hideScrollY, varAlpha } from "@/util";
import { Box, BoxProps, ButtonBase, ButtonBaseProps, Collapse, Stack, StackProps, useTheme } from "@mui/material";
import { useBooleanState } from "@pency/util";
import Link from "next/link";
import React, { forwardRef, PropsWithoutRef, useMemo } from "react";

const navToken = {
  ul: {
    gap: "--nav-ul-gap",
  },
  branch: {
    iconSize: "--nav-branch-icon-size",
    minHeight: "--nav-branch-min-heihgt",
    padding: "--nav-branch-padding",
    borderRadius: "--nav-branch-border-radius",
  },
  leaf: {
    iconSize: "--nav-leaf-icon-size",
    minHeight: "--nav-leaf-min-heihgt",
    padding: "--nav-leaf-padding",
    borderRadius: "--nav-leaf-border-radius",
  },
} as const;

// ----------------------------------------------------------------------

type UlProps = PropsWithoutRef<BoxProps<"ul">>;

const Ul = (props: UlProps) => {
  return (
    <Box
      {...props}
      component="ul"
      sx={{
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        gap: `var(${navToken.ul.gap})`,
        ...props.sx,
      }}
    />
  );
};

type LiProps = PropsWithoutRef<BoxProps<"li">>;

const Li = (props: LiProps) => {
  return (
    <Box
      {...props}
      component="li"
      sx={{
        display: "flex",
        flexDirection: "column",
        ...props.sx,
      }}
    />
  );
};

// ----------------------------------------------------------------------

type NavFnProps = PropsWithoutRef<StackProps>;
const NavFn = ({ children, ...rest }: NavFnProps) => {
  const theme = useTheme();

  return (
    <Stack
      {...rest}
      component="nav"
      sx={{
        flex: "1 1 auto",
        ...hideScrollY,
        [navToken.ul.gap]: theme.spacing(0.5),

        [navToken.branch.iconSize]: "24px",
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
};

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

type BranchFnProps = {
  icon?: React.ReactElement;
  label: string;
  children?: React.ReactNode;
};

const BranchFn = ({ icon, label, children }: BranchFnProps) => {
  const theme = useTheme();
  const { bool: isOpen } = useBooleanState(false);
  const { bool: isActive } = useBooleanState(false);

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
    <>
      <ButtonBase
        LinkComponent={Link}
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
          ...(isActive && {
            color: `var(${navToken.leaf.activeColor})`,
            bgcolor: `var(${navToken.leaf.activeBgcolor})`,
            "&:hover": {
              bgcolor: `var(${navToken.leaf.hoverActiveBgcolor})`,
            },
          }),
        }}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              flexShrink: 0,
              display: "inline-flex",
              margin: theme.spacing(0, 1.5, 0, 0),
              marginTop: "-2px",
              "& svg": {
                width: `var(${navToken.branch.iconSize})`,
                height: `var(${navToken.branch.iconSize})`,
              },
            }}
          >
            {icon}
          </Box>
        )}

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
              fontWeight: isActive ? theme.typography.fontWeightSemiBold : theme.typography.fontWeightMedium,
            }}
          >
            {label}
          </Box>
        </Box>
        {isOpen ? <EvaArrowIosDownwardFillIcon sx={iconStyles} /> : <EvaArrowIosForwardFillIcon sx={iconStyles} />}
      </ButtonBase>

      <Li>
        <Collapse in={isOpen} mountOnEnter unmountOnExit>
          <Ul sx={{ pl: `calc(${theme.spacing(1.5)} + var(${navToken.leaf.iconSize}))` }}>{children}</Ul>
        </Collapse>
      </Li>
    </>
  );
};

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
