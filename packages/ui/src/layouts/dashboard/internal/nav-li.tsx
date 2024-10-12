import { Box } from "@mui/material";

type Props = {
  children?: React.ReactNode;
};

export function NavLi({ children }: Props) {
  return (
    <Box
      component="li"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
}
