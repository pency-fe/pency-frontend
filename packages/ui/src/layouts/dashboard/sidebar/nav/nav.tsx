import { Box, ButtonBase, ButtonBaseProps, Collapse, Stack, SxProps } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { NavData, BranchData, LeafData } from "../types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { varAlpha } from "../../../../util";
import { useCallback, useMemo, useState } from "react";

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
    activeBgcolor: "--nav-leaf-active-bgcolor",
    hoverActiveBgcolor: "--nav-leaf-hover-active-bgcolor",
  },
} as const;

type NavProps = {
  data: NavData;
  sx?: SxProps<Theme>;
};

export function Nav({ data, sx }: NavProps) {
  const theme = useTheme();
  return (
    <Stack
      component="nav"
      sx={{
        px: 2,
        flex: "1 1 auto",
        [navToken.ul.gap]: theme.spacing(0.5),
        [navToken.leaf.iconSize]: "24px",
        [navToken.leaf.minHeight]: "44px",
        [navToken.leaf.color]: theme.vars.palette.text.secondary,
        [navToken.leaf.activeColor]: theme.vars.palette.primary.main,
        [navToken.leaf.bgcolor]: "transparent",
        [navToken.leaf.activeBgcolor]: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
        [navToken.leaf.hoverActiveBgcolor]: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
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
  const theme = useTheme();
  return (
    <Box
      component="ul"
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto",
        gap: `var(${navToken.ul.gap})`,
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

  const [open, setOpen] = useState(data.items.some((item) => pathname.startsWith(item.href)));
  const theme = useTheme();

  const handleOpen = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const parentActive = useMemo(() => data.items.some((item) => pathname.startsWith(item.href)), [data, pathname]);

  return (
    <>
      <Leaf
        data={data}
        active={parentActive}
        arrow={open ? "downward" : "forward"}
        sx={{
          mb: `var(${navToken.ul.gap})`,
          ...(!parentActive &&
            open && {
              [navToken.leaf.color]: theme.vars.palette.text.primary,
              [navToken.leaf.bgcolor]: theme.vars.palette.action.selected,
              [navToken.leaf.hoverActiveBgcolor]: theme.vars.palette.action.selected,
            }),
        }}
        onClick={handleOpen}
      />
      <Collapse in={open} mountOnEnter unmountOnExit>
        <Ul sx={{ pl: `calc(${theme.spacing(1.5)} + var(${navToken.leaf.iconSize}))` }}>
          {data.items.map((item) => (
            <Li key={item.id}>
              <Leaf
                data={item}
                active={pathname.startsWith(item.href)}
                arrow="none"
                sx={{
                  [navToken.leaf.minHeight]: "36px",
                  [navToken.leaf.activeColor]: theme.vars.palette.text.primary,
                  [navToken.leaf.activeBgcolor]: theme.vars.palette.action.selected,
                  [navToken.leaf.hoverActiveBgcolor]: theme.vars.palette.action.selected,
                }}
              />
            </Li>
          ))}
        </Ul>
      </Collapse>
    </>
  );
}

// ----------------------------------------------------------------------

type LeafProps = {
  data: Omit<LeafData, "href"> & Partial<Pick<LeafData, "href">>;
  active: boolean;
  arrow: "forward" | "downward" | "none";
  sx?: SxProps<Theme>;
} & ButtonBaseProps;

function Leaf({ data, active, arrow, sx, ...rest }: LeafProps) {
  const theme = useTheme();

  return (
    <ButtonBase
      LinkComponent={Link}
      {...(data.href && { href: data.href })}
      sx={{
        width: "100%",
        minHeight: `var(${navToken.leaf.minHeight})`,
        pt: theme.spacing(0.5),
        pr: theme.spacing(1),
        pb: theme.spacing(0.5),
        pl: theme.spacing(1.5),
        borderRadius: `${theme.shape.borderRadius}px`,
        bgcolor: `var(${navToken.leaf.bgcolor})`,
        color: `var(${navToken.leaf.color})`,
        textAlign: "start",
        "&:hover": {
          bgcolor: theme.vars.palette.action.hover,
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
            width: `var(${navToken.leaf.iconSize})`,
            height: `var(${navToken.leaf.iconSize})`,
            margin: theme.spacing(0, 1.5, 0, 0),
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
      {arrow !== "none" ? (
        <Icon
          icon={arrow === "downward" ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"}
          style={{
            width: "16px",
            height: "16px",
            marginLeft: "6px",
          }}
        />
      ) : null}
    </ButtonBase>
  );
}
