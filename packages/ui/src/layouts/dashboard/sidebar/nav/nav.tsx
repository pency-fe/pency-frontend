import { Box, ButtonBase, Stack, SxProps } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { NavData, BranchData, LeafData } from "../types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { varAlpha } from "../../../../util";

const navToken = {
  ul: {
    gap: "--nav-ul-gap",
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
        <Leaf data={data} active={pathname.startsWith(data.href)} depth={false} />
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
  const theme = useTheme();

  return (
    <>
      <Leaf
        data={data}
        active={data.items.some((item) => pathname.startsWith(item.href))}
        depth={false}
        sx={{ mb: `var(${navToken.ul.gap})` }}
      />
      <Ul>
        {data.items.map((item) => (
          <Li key={item.id}>
            <Leaf data={item} active={pathname.startsWith(item.href)} depth={true} />
          </Li>
        ))}
      </Ul>
    </>
  );
}

// ----------------------------------------------------------------------

type LeafProps = {
  data: Omit<LeafData, "href"> & Partial<Pick<LeafData, "href">>;
  active: boolean;
  depth: boolean;
  sx?: SxProps<Theme>;
};

function Leaf({ data, active, depth, sx }: LeafProps) {
  const theme = useTheme();

  return (
    <ButtonBase
      LinkComponent={Link}
      {...(data.href && { href: data.href })}
      sx={{
        width: "100%",
        minHeight: "44px",
        pt: theme.spacing(0.5),
        pr: theme.spacing(1),
        pb: theme.spacing(0.5),
        pl: theme.spacing(1.5),
        borderRadius: `${theme.shape.borderRadius}px`,
        color: theme.vars.palette.text.secondary,
        textAlign: "start",
        "&:hover": {
          bgcolor: theme.vars.palette.action.hover,
        },
        ...(active && {
          color: theme.vars.palette.primary.main,
          bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
          "&:hover": {
            bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
          },
        }),
        ml: depth ? `calc(${theme.spacing(1.5)} + 24px)` : null,
        ...sx,
      }}
    >
      {data.icon ? (
        <Box
          component="span"
          sx={{
            width: "24px",
            height: "24px",
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
    </ButtonBase>
  );
}
