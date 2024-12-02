import { forwardRef } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

/**
 * @description
 * https://icon-sets.iconify.design/eva/list-outline/
 */
export const EvaListOutlineIcon = forwardRef<SVGSVGElement, SvgIconProps>((rest, ref) => (
  <SvgIcon ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
    <circle cx="4" cy="7" r="1" fill="currentColor" />
    <circle cx="4" cy="12" r="1" fill="currentColor" />
    <circle cx="4" cy="17" r="1" fill="currentColor" />
    <rect width="14" height="2" x="7" y="11" fill="currentColor" rx=".94" ry=".94" />
    <rect width="14" height="2" x="7" y="16" fill="currentColor" rx=".94" ry=".94" />
    <rect width="14" height="2" x="7" y="6" fill="currentColor" rx=".94" ry=".94" />
  </SvgIcon>
));
