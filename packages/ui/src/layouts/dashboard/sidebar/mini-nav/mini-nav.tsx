import { Box, ButtonBase, ButtonBaseProps, Paper, Popover, Stack, SxProps } from "@mui/material";
import { BranchData, LeafData, NavData } from "../types";
import { Theme, useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { hideScrollY, paper, varAlpha } from "../../../../util";
import { forwardRef, useEffect, useMemo, useRef } from "react";
import { Iconify } from "../../../../components";
import { useBooleanState } from "@pency/util";

const miniNavToken = {
  ul: {
    gap: "--nav-ul-gap",
  },
  leaf: {
    color: "--nav-leaf-color",
    bgcolor: "--nav-leaf-bgcolor",
    activeBgcolor: "--nav-leaf-active-bgcolor",
  },
} as const;

type MiniNavProps = {
  data: NavData;
  sx?: SxProps<Theme>;
};

// ----------------------------------------------------------------------

export function MiniNav({ data, sx }: MiniNavProps) {
  const theme = useTheme();
  return (
    <Stack
      component="nav"
      sx={{
        flex: "1 1 auto",
        px: 0.5,
        pb: 2,
        ...hideScrollY,
        [miniNavToken.ul.gap]: theme.spacing(0.5),
        [miniNavToken.leaf.color]: theme.vars.palette.text.secondary,
        [miniNavToken.leaf.bgcolor]: "transparent",
        [miniNavToken.leaf.activeBgcolor]: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
        ...sx,
      }}
    >
      <Ul>
        {data.map((group) => (
          <Li key={group.id}>
            <Ul>
              {group.items.map((item) => (
                <Trunk key={item.id} data={item} />
              ))}
            </Ul>
          </Li>
        ))}
      </Ul>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type UlProps = {
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
};

function Ul({ sx, children }: UlProps) {
  return (
    <Box
      component="ul"
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto",
        gap: `var(${miniNavToken.ul.gap})`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

// ----------------------------------------------------------------------

type LiProps = {
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
};

function Li({ sx, children }: LiProps) {
  return (
    <Box
      component="li"
      sx={{
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

// ----------------------------------------------------------------------

type TrunkProps = {
  data: BranchData | LeafData;
};

function Trunk({ data }: TrunkProps) {
  const pathname = usePathname();

  return (
    <Li>
      {isLeafData(data) ? (
        <Leaf data={data} active={pathname.startsWith(data.href)} arrow="none" />
      ) : (
        <Branch data={data} />
      )}
    </Li>
  );
}

function isLeafData(data: LeafData | BranchData): data is LeafData {
  return (data as LeafData).href !== undefined;
}

// ----------------------------------------------------------------------

type BranchProps = {
  data: BranchData;
};

function Branch({ data }: BranchProps) {
  const pathname = usePathname();

  const open = useBooleanState(false);

  const parentRef = useRef<HTMLButtonElement | null>(null);
  const theme = useTheme();

  const parentActive = useMemo(() => data.items.some((item) => pathname.startsWith(item.href)), [data, pathname]);

  useEffect(() => {
    if (open.bool) {
      open.setFalse();
    }
  }, [pathname]);

  return (
    <>
      <Leaf
        ref={parentRef}
        data={data}
        active={parentActive}
        arrow="forward"
        sx={{
          ...(!parentActive &&
            open.bool && {
              [miniNavToken.leaf.color]: theme.vars.palette.text.primary,
              [miniNavToken.leaf.bgcolor]: theme.vars.palette.action.hover,
            }),
          ...(parentActive &&
            open.bool && {
              [miniNavToken.leaf.activeBgcolor]: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
            }),
        }}
        onMouseEnter={open.setTrue}
        onMouseLeave={open.setFalse}
      />
      <Popover
        disableScrollLock
        open={open.bool}
        anchorEl={parentRef.current}
        anchorOrigin={{ vertical: "center", horizontal: "right" }}
        transformOrigin={{ vertical: "center", horizontal: "left" }}
        slotProps={{
          paper: {
            onMouseEnter: open.setTrue,
            onMouseLeave: open.setFalse,
            sx: {
              px: 0.75,
              boxShadow: "none",
              overflow: "unset",
              backdropFilter: "none",
              background: "transparent",
              pointerEvents: "auto",
            },
          },
        }}
        sx={{ pointerEvents: "none" }}
      >
        <Paper sx={{ minWidth: 180, ...paper({ theme, dropdown: true }) }}>
          <Ul sx={{ [miniNavToken.ul.gap]: theme.spacing(0.5) }}>
            {data.items.map((item) => (
              <Li key={item.id}>
                <SubLeaf data={item} active={pathname.startsWith(item.href)} />
              </Li>
            ))}
          </Ul>
        </Paper>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

type LeafProps = {
  data: Omit<LeafData, "href"> & Partial<Pick<LeafData, "href">>;
  active: boolean;
  arrow: "forward" | "none";
  sx?: SxProps<Theme>;
} & ButtonBaseProps;

const Leaf = forwardRef<HTMLButtonElement, LeafProps>(({ data, active, arrow, sx, ...rest }, ref) => {
  const theme = useTheme();

  return (
    <ButtonBase
      ref={ref}
      LinkComponent={Link}
      {...(data.href && { href: data.href })}
      sx={{
        flexDirection: "column",
        width: "100%",
        minHeight: "56px",
        padding: theme.spacing(1, 0.5, 0.75, 0.5),
        borderRadius: `${theme.shape.borderRadius}px`,
        bgcolor: `var(${miniNavToken.leaf.bgcolor})`,
        color: `var(${miniNavToken.leaf.color})`,
        textAlign: "center",
        ...(active && {
          color: theme.vars.palette.primary.main,
          bgcolor: `var(${miniNavToken.leaf.activeBgcolor})`,
          "&:hover": {
            bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
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
            width: "22px",
            height: "22px",
            margin: theme.spacing(0, 0, 0.75, 0),
          }}
        >
          {data.icon}
        </Box>
      ) : null}

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
        {data.title}
      </Box>

      {arrow !== "none" ? (
        <Iconify
          icon="eva:arrow-ios-forward-fill"
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
      ) : null}
    </ButtonBase>
  );
});

// ----------------------------------------------------------------------

type SubLeafProps = {
  data: LeafData;
  active: boolean;
  sx?: SxProps<Theme>;
};

function SubLeaf({ data, active, sx }: SubLeafProps) {
  const theme = useTheme();

  return (
    <ButtonBase
      LinkComponent={Link}
      href={data.href}
      sx={{
        width: "100%",
        minHeight: "34px",
        padding: theme.spacing(0, 1),
        borderRadius: `${theme.shape.borderRadius}px`,
        color: theme.vars.palette.text.secondary,
        "&:hover": {
          bgcolor: theme.palette.action.hover,
        },
        ...(active && {
          color: theme.vars.palette.text.primary,
          bgcolor: theme.vars.palette.action.selected,
          "&:hover": {
            bgcolor: theme.vars.palette.action.selected,
          },
        }),
        ...sx,
      }}
    >
      {data.icon ? (
        <Box
          component="span"
          sx={{
            flexShrink: 0,
            display: "inline-flex",
            width: "22px",
            height: "22px",
            margin: theme.spacing(0, 1, 0, 0),
          }}
        >
          {data.icon}
        </Box>
      ) : null}

      <Box
        component="span"
        sx={{
          flex: "1 1 auto",
          ...theme.typography.body2,
          fontWeight: active ? theme.typography.fontWeightSemiBold : theme.typography.fontWeightMedium,
        }}
      >
        {data.title}
      </Box>
    </ButtonBase>
  );
}
