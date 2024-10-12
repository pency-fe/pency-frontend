import { AppBar, AppBarProps, Box, Container, GlobalStyles, GlobalStylesProps, Toolbar } from "@mui/material";
import { CSSObject, useTheme } from "@mui/material/styles";
import { layoutClasses } from "../classes";
import { useMemo } from "react";
import { bgBlur } from "../../theme/core/mixins";
import { varAlpha } from "../../util";
import { useScrollOffSetTop } from "../../hooks";

// ----------------------------------------------------------------------

export const headerToken = {
  blur: "--layout-dashboard-header-blur",
  zIndex: "--layout-dashboard-header-zIndex",
  mobileHeight: "--layout-dashboard-header-mobile-height",
  desktopHeight: "--layout-dashboard-header-desktop-height",
} as const;

const globalStylesProps: GlobalStylesProps["styles"] = {
  body: {
    [headerToken.blur]: "8px",
    [headerToken.zIndex]: 1100,
    [headerToken.mobileHeight]: "64px",
    [headerToken.desktopHeight]: "72px",
  },
};

// ----------------------------------------------------------------------

type Props = AppBarProps & {
  disableOffset?: boolean;
  slots?: {
    topArea?: React.ReactNode;
    leftArea?: React.ReactNode;
    centerArea?: React.ReactNode;
    rightArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
};

export function Header({ disableOffset, slots }: Props) {
  const theme = useTheme();

  const { offsetTop } = useScrollOffSetTop();

  const toolbarStyles: Record<"default" | "offset", CSSObject> = useMemo(
    () => ({
      default: {
        minHeight: "auto",
        height: `var(${headerToken.mobileHeight})`,
        transition: theme.transitions.create(["height", "background-color"], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.shorter,
        }),
        [theme.breakpoints.up("sm")]: {
          minHeight: "auto",
        },
        [theme.breakpoints.up("lg")]: {
          height: `var(${headerToken.desktopHeight})`,
        },
      },
      offset: {
        ...bgBlur({ color: varAlpha(theme.vars.palette.background.defaultChannel, 0.8) }),
      },
    }),
    [theme],
  );

  return (
    <>
      <GlobalStyles styles={globalStylesProps} />
      <AppBar className={layoutClasses.header} sx={{ position: "sticky", zIndex: `var(${headerToken.zIndex})` }}>
        {slots?.topArea}

        <Toolbar
          disableGutters
          sx={{
            ...toolbarStyles.default,
            ...(!disableOffset && offsetTop && toolbarStyles.offset),
          }}
        >
          <Container
            maxWidth={false}
            sx={{
              height: 1,
              display: "flex",
              alignItems: "center",
              px: { ["lg"]: 5 },
            }}
          >
            {slots?.leftArea}
            <Box sx={{ display: "flex", flex: "1 1 auto", justifyContent: "center" }}>{slots?.centerArea}</Box>
            {slots?.rightArea}
          </Container>
        </Toolbar>
        {slots?.bottomArea}
      </AppBar>
    </>
  );
}
