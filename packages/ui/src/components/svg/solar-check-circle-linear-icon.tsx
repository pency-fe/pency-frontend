import { forwardRef } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

/**
 * @description
 * https://icon-sets.iconify.design/solar/check-circle-linear/
 */
export const SolarCheckCircleLinearIcon = forwardRef<SVGSVGElement, SvgIconProps>((rest, ref) => {
  return (
    <SvgIcon ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
      <g fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10" />
        <path stroke-linecap="round" stroke-linejoin="round" d="m8.5 12.5l2 2l5-5" />
      </g>
    </SvgIcon>
  );
});
