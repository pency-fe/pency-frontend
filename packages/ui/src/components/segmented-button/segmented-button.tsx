"use client";

import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";

export const SegmentedButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  borderWidth: 0,
})) as typeof ToggleButtonGroup;

export const SegmentedButton = styled(ToggleButton)(({ theme }) => ({
  padding: "4px",
})) as typeof ToggleButton;
