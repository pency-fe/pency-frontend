import { Box, Container, SxProps, useTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { Header } from "../header";
import { Sidebar } from "../sidebar";

type Props = {
  slots: {
    header: React.ReactElement;
    sidebar: React.ReactElement;
    footer?: React.ReactElement;
  };
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
};

export function Layout({ slots, sx, children }: Props) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        minHeight: 1,
        ...sx,
      }}
    >
      {slots.header}
      {slots.sidebar}
      <Box
        sx={{
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          transition: theme.transitions.create(["padding-left"], {
            easing: `var(${Sidebar.token.easing})`,
            duration: `var(${Sidebar.token.duration})`,
          }),
          [theme.breakpoints.up("sm")]: {
            pl: `var(${Sidebar.token.upSmWidth})`,
          },
          [theme.breakpoints.up("lg")]: {
            pl: `var(${Sidebar.token.upLgWidth})`,
          },
        }}
      >
        <Container
          component="main"
          sx={{
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            maxWidth: "lg",
            pt: theme.spacing(1),
            pb: theme.spacing(8),
            mt: `var(${Header.token.height})`,
            [theme.breakpoints.up("lg")]: { mt: `var(${Header.token.upSmHeight})` },
          }}
        >
          {children}
        </Container>

        {slots?.footer}
      </Box>
    </Box>
  );
}
