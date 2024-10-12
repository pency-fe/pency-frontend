import { AppBar, AppBarProps, Box, Container, GlobalStyles, GlobalStylesProps, Toolbar } from "@mui/material";
import { Breakpoint, CSSObject, useTheme } from "@mui/material/styles";
import { layoutClasses } from "../classes";
import { useMemo } from "react";
import { bgBlur } from "../../theme/core/mixins";
import { varAlpha } from "../../util";
import { useScrollOffSetTop } from "../../hooks";

// ----------------------------------------------------------------------

export const layoutHeaderVars = {
  blur: "--layout-header-blur",
  zIndex: "--layout-header-zIndex",
  "mobile-height": "--layout-header-mobile-height",
  "desktop-height": "--layout-header-desktop-height",
} as const;

const globalStylesProps: GlobalStylesProps["styles"] = {
  [layoutHeaderVars.blur]: "8px",
  [layoutHeaderVars.zIndex]: 1100,
  [layoutHeaderVars["mobile-height"]]: "64px",
  [layoutHeaderVars["desktop-height"]]: "72px",
};

// ----------------------------------------------------------------------

type Props = AppBarProps & {
  layoutQuery?: Breakpoint;
  disableOffset?: boolean;
  slots?: {
    topArea?: React.ReactNode;
    leftArea?: React.ReactNode;
    centerArea?: React.ReactNode;
    rightArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
};

export function HeaderSection({ disableOffset, slots }: Props) {
  const theme = useTheme();

  const { offsetTop } = useScrollOffSetTop();

  const toolbarStyles: Record<"default" | "offset", CSSObject> = useMemo(
    () => ({
      default: {
        minHeight: "auto",
        height: `var(${layoutHeaderVars["mobile-height"]})`,
        transition: theme.transitions.create(["height", "background-color"], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.shorter,
        }),
        [theme.breakpoints.up("sm")]: {
          minHeight: "auto",
        },
        [theme.breakpoints.up("lg")]: {
          height: `var(${layoutHeaderVars["desktop-height"]})`,
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
      <AppBar className={layoutClasses.header} sx={{ position: "sticky", zIndex: `var(${layoutHeaderVars.zIndex})` }}>
        {slots?.topArea}

        <Toolbar
          disableGutters
          sx={{
            ...toolbarStyles.default,
            ...(!disableOffset && offsetTop && toolbarStyles.offset),
          }}
        >
          <Container
            sx={{
              height: 1,
              display: "flex",
              alignItems: "center",
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
