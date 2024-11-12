"use client";

import { EvaArrowIosDownwardFillIcon, EvaArrowIosForwardFillIcon } from "@/components/svg";
import { hideScrollY, varAlpha } from "@/util";
import {
  Box,
  BoxProps,
  Button,
  ButtonBase,
  ButtonBaseProps,
  ButtonProps,
  Collapse,
  Stack,
  StackProps,
  useTheme,
} from "@mui/material";
import { useBooleanState } from "@pency/util";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { PropsWithoutRef, useMemo } from "react";

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
      component="ul"
      {...props}
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
      component="li"
      {...props}
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
      component="nav"
      {...rest}
      sx={{
        flex: "1 1 auto",
        ...hideScrollY,
        [navToken.ul.gap]: theme.spacing(0.5),

        [navToken.branch.iconSize]: "24px",
        [navToken.branch.minHeight]: "44px",
        [navToken.branch.padding]: theme.spacing(0.5, 1, 0.5, 1.5),
        [navToken.branch.borderRadius]: "8px",

        [navToken.leaf.iconSize]: "24px",
        [navToken.leaf.minHeight]: "36px",
        [navToken.leaf.padding]: theme.spacing(0.5, 1, 0.5, 1.5),
        [navToken.leaf.borderRadius]: "8px",
        ...rest.sx,
      }}
    >
      <Ul>{children}</Ul>
    </Stack>
  );
};

// ----------------------------------------------------------------------

type TreeFnProps = PropsWithoutRef<LiProps>;

const TreeFn = ({ children, ...rest }: TreeFnProps) => {
  const theme = useTheme();
  return (
    <Li {...rest}>
      <Ul sx={{ gap: theme.spacing(0.75) }}>{children}</Ul>
    </Li>
  );
};

// ----------------------------------------------------------------------

type BranchFnProps = {
  icon?: React.ReactElement;
  label: string;
  startsWith: string;
  children?: React.ReactNode;
};

const BranchFn = ({ icon, label, startsWith, children }: BranchFnProps) => {
  const pathname = usePathname();
  const { bool: isOpen, toggle: toggleOpen } = useBooleanState(pathname.startsWith(startsWith));
  const theme = useTheme();

  const active = useMemo(() => pathname.startsWith(startsWith), [startsWith, pathname]);

  const arrowIconStyles = useMemo(
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
    <Li>
      <ButtonBase
        onClick={toggleOpen}
        sx={{
          minHeight: `var(${navToken.branch.minHeight})`,
          padding: `var(${navToken.branch.padding})`,
          borderRadius: `var(${navToken.branch.borderRadius})`,
          bgcolor: "transparent",
          color: theme.vars.palette.text.secondary,
          textAlign: "start",
          "&:hover": {
            bgcolor: theme.vars.palette.action.hover,
          },
          ...(isOpen && {
            bgcolor: theme.vars.palette.action.selected,
            color: theme.vars.palette.text.primary,
            "&:hover": {
              bgcolor: theme.vars.palette.action.selected,
            },
          }),
          ...(active && {
            bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
            color: theme.vars.palette.primary.main,
            "&:hover": {
              bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
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
              display: "block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              ...theme.typography.body1,
              fontWeight: active ? theme.typography.fontWeightSemiBold : theme.typography.fontWeightMedium,
            }}
          >
            {label}
          </Box>
        </Box>
        {isOpen ? (
          <EvaArrowIosDownwardFillIcon sx={arrowIconStyles} />
        ) : (
          <EvaArrowIosForwardFillIcon sx={arrowIconStyles} />
        )}
      </ButtonBase>

      <Collapse in={isOpen} mountOnEnter unmountOnExit sx={{ mt: `var(${navToken.ul.gap})` }}>
        <Ul sx={{ pl: `calc(${theme.spacing(1.5)} + var(${navToken.leaf.iconSize}))` }}>{children}</Ul>
      </Collapse>
    </Li>
  );
};

// ----------------------------------------------------------------------

type BranchAnchorFnProps = <C extends "a" | typeof Link>(
  props: ButtonBaseProps<
    C,
    {
      component?: C;
      href: string;
      icon?: React.ReactElement;
      label: string;
    }
  >,
) => JSX.Element;

const BranchAnchorFn: BranchAnchorFnProps = ({ icon, label, href, ...rest }) => {
  const pathname = usePathname();
  const { bool: isOpen, toggle: toggleOpen } = useBooleanState(pathname.startsWith(href));
  const theme = useTheme();

  const active = useMemo(() => pathname.startsWith(href), [href, pathname]);

  return (
    <Li>
      <ButtonBase
        onClick={toggleOpen}
        sx={{
          minHeight: `var(${navToken.branch.minHeight})`,
          padding: `var(${navToken.branch.padding})`,
          borderRadius: `var(${navToken.branch.borderRadius})`,
          bgcolor: "transparent",
          color: theme.vars.palette.text.secondary,
          textAlign: "start",
          "&:hover": {
            bgcolor: theme.vars.palette.action.hover,
          },
          ...(active && {
            bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
            color: theme.vars.palette.primary.main,
            "&:hover": {
              bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
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
              display: "block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              ...theme.typography.body1,
              fontWeight: active ? theme.typography.fontWeightSemiBold : theme.typography.fontWeightMedium,
            }}
          >
            {label}
          </Box>
        </Box>
      </ButtonBase>
    </Li>
  );
};

// ----------------------------------------------------------------------

type LeafAnchorFnType = <C extends "a" | typeof Link>(
  props: ButtonBaseProps<
    C,
    {
      component?: C;
      href: string;
      icon?: React.ReactElement;
      label: string;
    }
  >,
) => JSX.Element;

const LeafAnchorFn: LeafAnchorFnType = ({ icon, label, href, ...rest }) => {
  const pathname = usePathname();
  const theme = useTheme();

  const active = useMemo(() => pathname.startsWith(href), [href, pathname]);

  return (
    <Li>
      <ButtonBase
        href={href}
        {...rest}
        sx={{
          minHeight: `var(${navToken.leaf.minHeight})`,
          padding: `var(${navToken.leaf.padding})`,
          borderRadius: `var(${navToken.leaf.borderRadius})`,
          bgcolor: "transparent",
          color: theme.vars.palette.text.secondary,
          textAlign: "start",
          "&:hover": {
            bgcolor: theme.vars.palette.action.hover,
          },
          ...(active && {
            bgcolor: theme.vars.palette.action.selected,
            color: theme.vars.palette.text.primary,
            "&:hover": {
              bgcolor: theme.vars.palette.action.selected,
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
                width: `var(${navToken.leaf.iconSize})`,
                height: `var(${navToken.leaf.iconSize})`,
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
              display: "block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              ...theme.typography.body1,
              fontWeight: active ? theme.typography.fontWeightSemiBold : theme.typography.fontWeightMedium,
            }}
          >
            {label}
          </Box>
        </Box>
      </ButtonBase>
    </Li>
  );
};

// ----------------------------------------------------------------------

type LeafButtonFnProps = ButtonProps;

const LeafButtonFn = ({ children, sx, ...rest }: LeafButtonFnProps) => {
  return (
    <Li>
      <Button
        variant="contained"
        color="primary"
        {...rest}
        sx={{
          minHeight: `var(${navToken.leaf.minHeight})`,
          padding: `var(${navToken.leaf.padding})`,
          borderRadius: `var(${navToken.leaf.borderRadius})`,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          ...sx,
        }}
      >
        {children}
      </Button>
    </Li>
  );
};

// ----------------------------------------------------------------------

export const Nav = Object.assign(NavFn, {
  Tree: Object.assign(TreeFn, {
    Branch: Object.assign(BranchFn, {
      LeafAnchor: LeafAnchorFn,
      LeafButton: LeafButtonFn,
    }),
    BranchAnchor: BranchAnchorFn,
  }),
});
