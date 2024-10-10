"use client";

import { useColorScheme, useTheme } from "@mui/material";
import { useConfigThemeContext } from "@pency/ui";

export default function Page() {
  const theme = useColorScheme();

  console.log();

  return (
    <>
      <h1>Test Page</h1>
      {/* <Button variant="contained">hi1</Button>
      <Button variant="contained">hi2</Button> */}
    </>
  );
}
