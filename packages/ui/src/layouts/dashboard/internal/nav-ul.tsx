import { Box, GlobalStyles, GlobalStylesProps, SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export const navUlToken = {
  gap: "--layout-dashboard-nav-ul-gap",
} as const;

const globalStylesProps: GlobalStylesProps["styles"] = (theme) => ({
  [navUlToken.gap]: theme.spacing(0.5),
});

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
};

export function NavUl({ sx, children }: Props) {
  return (
    <>
      <GlobalStyles styles={globalStylesProps} />
      <Box component="ul" display="flex" flex="1 1 auto" gap={`var(${navUlToken.gap})`} sx={sx}>
        {children}
      </Box>
    </>
  );
}
