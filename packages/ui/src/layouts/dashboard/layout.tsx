import { Box, Container, useTheme } from "@mui/material";
import { layoutClasses } from "../classes";

type Props = {
  slots: {
    header: React.ReactNode;
    sidebar: React.ReactNode;
    footer?: React.ReactNode;
  };
  children?: React.ReactNode;
};

export function Layout({ slots, children }: Props) {
  const theme = useTheme();

  return (
    <Box id="root__layout" className={layoutClasses.root}>
      {slots.sidebar}
      <Box className={layoutClasses.hasSidebar} sx={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
        {slots.header}
        <Box
          component="main"
          className={layoutClasses.main}
          sx={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}
        >
          <Container
            className={layoutClasses.content}
            maxWidth="lg"
            sx={{
              display: "flex",
              flex: "1 1 auto",
              flexDirection: "column",
              pt: theme.spacing(1),
              pb: theme.spacing(8),
              [theme.breakpoints.up("lg")]: {
                px: theme.spacing(5),
              },
            }}
          >
            {children}
          </Container>
        </Box>
        {slots?.footer}
      </Box>
    </Box>
  );
}
