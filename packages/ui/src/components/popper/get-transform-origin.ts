import { PopperProps } from "@mui/material";
import { CSSProperties } from "react";

export const getTransformOrigin = (placement: PopperProps["placement"]) => {
  let transformOrigin: CSSProperties["transformOrigin"];

  switch (placement) {
    case "left-start":
      transformOrigin = "right top";
      break;
    case "left-end":
      transformOrigin = "right bottom";
      break;
    case "bottom":
      transformOrigin = "top";
      break;
    case "top":
      transformOrigin = "bottom";
      break;
  }
  return transformOrigin;
};
