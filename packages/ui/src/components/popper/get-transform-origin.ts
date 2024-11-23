import { PopperProps } from "@mui/material";
import { CSSProperties } from "react";

export const getTransformOrigin = (placement: PopperProps["placement"]) => {
  let transformOrigin: CSSProperties["transformOrigin"];

  switch (placement) {
    case "top-start":
      transformOrigin = "bottom left";
      break;
    case "top":
      transformOrigin = "bottom";
      break;
    case "top-end":
      transformOrigin = "bottom right";
      break;
    case "left-start":
      transformOrigin = "right top";
      break;
    case "left":
      transformOrigin = "right";
      break;
    case "left-end":
      transformOrigin = "right bottom";
      break;
    case "right-start":
      transformOrigin = "left top";
      break;
    case "right":
      transformOrigin = "left";
      break;
    case "right-end":
      transformOrigin = "left bottom";
      break;
    case "bottom-start":
      transformOrigin = "top left";
      break;
    case "bottom":
      transformOrigin = "top";
      break;
    case "bottom-end":
      transformOrigin = "top right";
      break;
  }
  return transformOrigin;
};
