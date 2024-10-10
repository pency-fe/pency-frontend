"use client";

import { Button, useColorScheme, useTheme } from "@mui/material";

export default function Page() {
  const theme = useTheme();
  const { setMode } = useColorScheme();

  return (
    <>
      <h1>Test Page</h1>
      <Button variant="contained" onClick={() => setMode("system")}>
        system mode
      </Button>
      <Button variant="contained" onClick={() => setMode("light")}>
        light mode
      </Button>
      <Button variant="contained" onClick={() => setMode("dark")}>
        dark mode
      </Button>
    </>
  );
}
