"use client";
import { Button, useTheme } from "@mui/material";

export default function Page() {
  return (
    <>
      <h1>Test Page</h1>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </>
  );
}
