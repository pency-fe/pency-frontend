import { EvaArrowIosDownwardFillIcon, EvaArrowIosForwardFillIcon } from "@/components/svg";
import { hideScrollY, varAlpha } from "@/util";
import { Box, BoxProps, ButtonBase, ButtonBaseProps, Collapse, Stack, StackProps, useTheme } from "@mui/material";
import { useBooleanState } from "@pency/util";
import Link from "next/link";
import React, { ComponentProps, createContext, forwardRef, PropsWithoutRef, useContext, useMemo } from "react";

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
  return (
    <Li {...rest}>
      <Ul>{children}</Ul>
    </Li>
  );
};

// ----------------------------------------------------------------------

const BranchDataContext = createContext<{ active: boolean } | undefined>(undefined);

function useBranchData(component: string) {
  const context = useContext(BranchDataContext);

  if (!context) throw new Error(`<${component} />의 부모로 <Branch /> 컴포넌트가 있어야 합니다.`);

  return context;
}

const BranchActionsContext = createContext<
  | {
      activate: ReturnType<typeof useBooleanState>["setTrue"];
      deactivate: ReturnType<typeof useBooleanState>["setFalse"];
    }
  | undefined
>(undefined);

function useBranchActions(component: string) {
  const context = useContext(BranchActionsContext);

  if (!context) throw new Error(`<${component} />의 부모로 <Branch /> 컴포넌트가 있어야 합니다.`);

  return context;
}

type BranchFnProps = {
  icon?: React.ReactElement;
  label: string;
  children?: React.ReactNode;
};

const BranchFn = ({ icon, label, children }: BranchFnProps) => {
  const theme = useTheme();
  const { bool: active, setTrue: activate, setFalse: deactivate } = useBooleanState(false);
  const { bool: isOpen, toggle: toggleOpen } = useBooleanState(false);

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
    <BranchDataContext.Provider value={{ active }}>
      <BranchActionsContext.Provider value={{ activate, deactivate }}>
        <ButtonBase
          onClick={toggleOpen}
          sx={{
            width: "100%",
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
      </BranchActionsContext.Provider>
    </BranchDataContext.Provider>
  );
};

// ----------------------------------------------------------------------

// type BranchSingleFnProps = {};

// const BranchSingleFn;

// ----------------------------------------------------------------------

type LeafFnProps = ;

const LeafFn = (props: LeafFnProps) => {
  return (
    <ButtonBase>
      <Link></Link>
    </ButtonBase>
  );
};

// ----------------------------------------------------------------------

export const Nav = Object.assign(NavFn, {
  Tree: Object.assign(TreeFn, {
    Branch: Object.assign(BranchFn, {
      Leaf: LeafFn,
    }),
    // BranchSingle: BranchSingleFn,
  }),
});
