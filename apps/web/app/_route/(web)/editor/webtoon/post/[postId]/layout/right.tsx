"use client";

import {
  Button,
  dialogClasses,
  Grid,
  IconButton,
  RadioGroup,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormDialog, MaterialSymbolsCloseIcon, RadioMenuItem } from "@pency/ui/components";
import { useBooleanState } from "@pency/util";
import { WT_Post_Create_Form } from "_core/webtoon/post";
import { useState } from "react";

// ----------------------------------------------------------------------

export default function Right() {
  return <WT_Post_Create_Form.ValidateSubmitButton />;
}
