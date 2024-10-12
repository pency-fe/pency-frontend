import { Box, ButtonBase, GlobalStyles, GlobalStylesProps } from "@mui/material";
import { Data } from "../../types";
import { MouseEventHandler, useCallback } from "react";

// ----------------------------------------------------------------------

export const navItemToken = {
  minHeight: "--layout-dashboard-nav-item-min-height",
  pt: "--layout-dashboard-nav-item-pt",
  pr: "--layout-dashboard-nav-item-pr",
  pb: "--layout-dashboard-nav-item-pb",
  pl: "--layout-dashboard-nav-item-pl",
  borderRadius: "--layout-dashboard-nav-item-border-radius",
  color: "--layout-dashboard-nav-item-color",
  hoverBgcolor: "--layout-dashboard-nav-item-hover-bgcolor",
  iconSize: "--layout-dashboard-nav-item-icon-size",
  iconMargin: "--layout-dashboard-nav-item-icon-margin",
} as const;

const globalStylesProps: GlobalStylesProps["styles"] = (theme) => ({
  body: {
    [navItemToken.minHeight]: "44px",
    [navItemToken.pt]: theme.spacing(0.5),
    [navItemToken.pr]: theme.spacing(1),
    [navItemToken.pb]: theme.spacing(0.5),
    [navItemToken.pl]: theme.spacing(1.5),
    [navItemToken.borderRadius]: `${theme.shape.borderRadius}px`,
    [navItemToken.color]: theme.palette.text.secondary,
    [navItemToken.hoverBgcolor]: theme.palette.action.hover,
    [navItemToken.iconSize]: "24px",
    [navItemToken.iconMargin]: theme.spacing(0, 1.5, 0, 0),
  },
});

// ----------------------------------------------------------------------

type Props = {
  data: Data[number]["items"][number];
};
export function NavItem({ data }: Props) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      if (data.href) {
        e.stopPropagation();
      }
    },
    [data],
  );

  return (
    <>
      <GlobalStyles styles={globalStylesProps} />

      <ButtonBase
        href={data.href}
        sx={{
          width: "100%",
          minHeight: `var(${navItemToken.minHeight})`,
          paddingTop: `var(${navItemToken.pt})`,
          paddingRight: `var(${navItemToken.pr})`,
          paddingBottom: `var(${navItemToken.pb})`,
          paddingLeft: `var(${navItemToken.pl})`,
          borderRadius: `var(${navItemToken.borderRadius})`,
          color: `var(${navItemToken.color})`,
          "&:hover": {
            backgroundColor: `var(${navItemToken.hoverBgcolor})`,
          },
        }}
      >
        <Box
          component="span"
          sx={{
            width: `var(${navItemToken.iconSize})`,
            height: `var(${navItemToken.iconSize})`,
            margin: `var(${navItemToken.iconMargin})`,
          }}
        >
          {data.icon}
        </Box>
        <Box component="span" sx={{ minWidth: 0, flex: "1 1 auto" }}>
          <Box
            component="span"
            sx={(theme) => ({
              width: "100%",
              maxWidth: "100%",
              display: "block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              ...theme.typography.body1,
              fontWeight: theme.typography.fontWeightMedium,
            })}
          >
            {data.title}
          </Box>
        </Box>
      </ButtonBase>
    </>
  );
}
