import { forwardRef } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

/**
 * @description
 * https://icon-sets.iconify.design/eva/menu-outline/
 */
export const EvaMenuOutlineIcon = forwardRef<SVGSVGElement, SvgIconProps>((rest, ref) => (
  <SvgIcon ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
    <rect width="18" height="2" x="3" y="11" fill="currentColor" rx=".95" ry=".95" />
    <rect width="18" height="2" x="3" y="16" fill="currentColor" rx=".95" ry=".95" />
    <rect width="18" height="2" x="3" y="6" fill="currentColor" rx=".95" ry=".95" />
  </SvgIcon>
));
