"use client";

import { Popperx, usePopperxState } from "@/components/popper";
import { EvaArrowIosForwardFillIcon } from "@/components/svg";
import { hideScrollY, varAlpha } from "@/util";
import { Box, BoxProps, ButtonBase, ButtonBaseProps, Stack, StackProps, useTheme } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, PropsWithoutRef, useContext, useMemo } from "react";
import { miniNavClasses } from "./mini-nav-classes";

const miniNavToken = {
  ul: {
    gap: "--mini-nav-ul-gap",
  },
  branch: {
    minHeight: "--mini-nav-branch-min-height",
    padding: "--mini-nav-branch-padding",
    borderRadius: "--mini-nav-branch-border-radius",
    iconSize: "--mini-nav-branch-icon-size",
  },
  leaf: {
    minHeight: "--mini-nav-leaf-min-height",
    padding: "--mini-nav-leaf-padding",
    borderRadius: "--mini-nav-leaf-border-radius",
    iconSize: "--mini-nav-leaf-icon-size",
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
        gap: `var(${miniNavToken.ul.gap})`,
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

type MiniNavFnProps = PropsWithoutRef<StackProps>;

const MiniNavFn = ({ children, ...rest }: MiniNavFnProps) => {
  const theme = useTheme();

  return (
    <>
      <Stack
        component="nav"
        {...rest}
        className={miniNavClasses.root}
        sx={{
          flex: "1 1 auto",
          ...hideScrollY,
          [miniNavToken.ul.gap]: theme.spacing(0.5),

          [miniNavToken.branch.minHeight]: "56px",
          [miniNavToken.branch.padding]: theme.spacing(1, 0.5, 0.75, 0.5),
          [miniNavToken.branch.borderRadius]: `${theme.shape.borderRadius}px`,
          [miniNavToken.branch.iconSize]: "22px",

          [miniNavToken.leaf.minHeight]: "34px",
          [miniNavToken.leaf.padding]: theme.spacing(0, 1),
          [miniNavToken.leaf.borderRadius]: `${theme.shape.borderRadius}px`,
          [miniNavToken.leaf.iconSize]: "22px",
          ...rest.sx,
        }}
      >
        <Ul>{children}</Ul>
      </Stack>
    </>
  );
};

// ----------------------------------------------------------------------

type TreeFnProps = PropsWithoutRef<LiProps>;

const TreeFn = ({ children, ...rest }: TreeFnProps) => {
  return (
    <Li {...rest}>
      <Ul>{children}</Ul>
    </Li>
  );
};

// ----------------------------------------------------------------------

const BranchActionsContext = createContext<{ close: (e: Event | React.SyntheticEvent) => void } | undefined>(undefined);

function useBranchActions(component: string) {
  const context = useContext(BranchActionsContext);

  if (!context) throw new Error(`<${component} />의 부모로 <MiniNav.Branch /> 컴포넌트가 있어야 합니다.`);

  return context;
}

type BranchFnProps = {
  icon?: React.ReactElement;
  label: string;
  startsWith: string;
  children?: React.ReactNode;
};
const BranchFn = ({ icon, label, startsWith, children }: BranchFnProps) => {
  const pathname = usePathname();
  const { anchorRef, isOpen, close, toggle } = usePopperxState();
  const theme = useTheme();

  const active = useMemo(() => pathname.startsWith(startsWith), [startsWith, pathname]);

  return (
    <Li>
      <ButtonBase
        ref={anchorRef}
        onClick={toggle}
        sx={{
          flexDirection: "column",
          width: 1,
          minHeight: `var(${miniNavToken.branch.minHeight})`,
          padding: `var(${miniNavToken.branch.padding})`,
          borderRadius: `var(${miniNavToken.branch.borderRadius})`,
          bgcolor: "transparent",
          color: theme.vars.palette.text.secondary,
          textAlign: "center",
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
              margin: theme.spacing(0, 0, 0.75, 0),
              "& svg": {
                width: `var(${miniNavToken.branch.iconSize})`,
                height: `var(${miniNavToken.branch.iconSize})`,
              },
            }}
          >
            {icon}
          </Box>
        )}

        <Box
          component="span"
          sx={{
            width: "100%",
            maxWidth: "100%",
            display: "block",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            fontSize: theme.typography.pxToRem(10),
            lineHeight: "16px",
            fontWeight: active ? theme.typography.fontWeightSemiBold : theme.typography.fontWeightMedium,
          }}
        >
          {label}
        </Box>

        <EvaArrowIosForwardFillIcon
          sx={{
            flexShrink: 0,
            position: "absolute",
            top: theme.spacing(1),
            right: theme.spacing(0.5),
            display: "inline-flex",
            width: "16px",
            height: "16px",
          }}
        />
      </ButtonBase>
      <Popperx
        anchorEl={anchorRef.current}
        disablePortal
        open={isOpen}
        onClose={close}
        placement="right"
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 6],
            },
          },
        ]}
        slotProps={{
          paper: {
            sx: {
              minWidth: 180,
              padding: theme.spacing(0.5),
            },
          },
        }}
      >
        <BranchActionsContext.Provider value={{ close }}>
          <Ul sx={{ [miniNavToken.ul.gap]: theme.spacing(0.5) }}>{children}</Ul>
        </BranchActionsContext.Provider>
      </Popperx>
    </Li>
  );
};

// ----------------------------------------------------------------------

type BranchAnchorFnProps<C extends "a" | typeof Link> = ButtonBaseProps<
  C,
  {
    component?: C;
    href: string;
    icon?: React.ReactElement;
    label: string;
  }
>;

const BranchAnchorFn = <C extends "a" | typeof Link>({ icon, label, href, ...rest }: BranchAnchorFnProps<C>) => {
  const pathname = usePathname();
  const theme = useTheme();

  const active = useMemo(() => pathname.startsWith(href), [href, pathname]);

  return (
    <Li>
      <ButtonBase
        href={href}
        {...rest}
        sx={{
          flexDirection: "column",
          width: 1,
          minHeight: `var(${miniNavToken.branch.minHeight})`,
          padding: `var(${miniNavToken.branch.padding})`,
          borderRadius: `var(${miniNavToken.branch.borderRadius})`,
          bgcolor: "transparent",
          color: theme.vars.palette.text.secondary,
          textAlign: "center",
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
              margin: theme.spacing(0, 0, 0.75, 0),
              "& svg": {
                width: `var(${miniNavToken.branch.iconSize})`,
                height: `var(${miniNavToken.branch.iconSize})`,
              },
            }}
          >
            {icon}
          </Box>
        )}

        <Box
          component="span"
          sx={{
            width: "100%",
            maxWidth: "100%",
            display: "block",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            fontSize: theme.typography.pxToRem(10),
            lineHeight: "16px",
            fontWeight: active ? theme.typography.fontWeightSemiBold : theme.typography.fontWeightMedium,
          }}
        >
          {label}
        </Box>
      </ButtonBase>
    </Li>
  );
};

// ----------------------------------------------------------------------

type LeafAnchorFnProps<C extends "a" | typeof Link> = ButtonBaseProps<
  C,
  { component?: C; href: string; icon?: React.ReactElement; label: string }
>;

const LeafAnchorFn = <C extends "a" | typeof Link>({ icon, label, href, ...rest }: LeafAnchorFnProps<C>) => {
  const { close } = useBranchActions("MiniNav.Branch.LeafAnchor");
  const pathname = usePathname();
  const theme = useTheme();

  const active = useMemo(() => pathname.startsWith(href), [href, pathname]);

  return (
    <Li>
      <ButtonBase
        href={href}
        {...rest}
        onClick={close}
        sx={{
          width: 1,
          minHeight: `var(${miniNavToken.leaf.minHeight})`,
          padding: `var(${miniNavToken.leaf.padding})`,
          borderRadius: `var(${miniNavToken.leaf.borderRadius})`,
          color: theme.vars.palette.text.secondary,
          bgcolor: "transparent",
          "&:hover": {
            bgcolor: theme.vars.palette.action.hover,
          },
          ...(active && {
            color: theme.vars.palette.text.primary,
            bgcolor: theme.vars.palette.action.selected,
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
              margin: theme.spacing(0, 1, 0, 0),
              "& svg": {
                width: `var(${miniNavToken.leaf.iconSize})`,
                height: `var(${miniNavToken.leaf.iconSize})`,
              },
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            flex: "1 1 auto",
            ...theme.typography.body2,
            fontWeight: active ? theme.typography.fontWeightSemiBold : theme.typography.fontWeightMedium,
          }}
        >
          {label}
        </Box>
      </ButtonBase>
    </Li>
  );
};

// ----------------------------------------------------------------------

const LeafButtonFn = () => {};

// ----------------------------------------------------------------------

export const MiniNav = Object.assign(MiniNavFn, {
  Tree: Object.assign(TreeFn, {
    Branch: Object.assign(BranchFn, {
      LeafAnchor: LeafAnchorFn,
      LeafButton: LeafButtonFn,
    }),
    BranchAnchor: BranchAnchorFn,
  }),
});
