import { forwardRef } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

/**
 * @description
 * https://icon-sets.iconify.design/eva/more-horizontal-outline/
 */
export const EvaMoreHorizontalOutlineIcon = forwardRef<SVGSVGElement, SvgIconProps>((rest, ref) => (
  <SvgIcon ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <circle cx="19" cy="12" r="2" fill="currentColor" />
    <circle cx="5" cy="12" r="2" fill="currentColor" />
  </SvgIcon>
));
