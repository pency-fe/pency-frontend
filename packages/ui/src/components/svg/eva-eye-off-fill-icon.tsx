import { forwardRef } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

/**
 * @description
 * https://icon-sets.iconify.design/eva/eye-off-fill/
 */
export const EvaEyeOffFillIcon = forwardRef<SVGSVGElement, SvgIconProps>((rest, ref) => (
  <SvgIcon ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <path
      fill="currentColor"
      d="M15.29 18.12L14 16.78l-.07-.07l-1.27-1.27a4 4 0 0 1-.61.06A3.5 3.5 0 0 1 8.5 12a4 4 0 0 1 .06-.61l-2-2L5 7.87a15.9 15.9 0 0 0-2.87 3.63a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25a9.5 9.5 0 0 0 3.23-.67ZM8.59 5.76l2.8 2.8A4 4 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a4 4 0 0 1-.06.61l2.68 2.68l.84.84a15.9 15.9 0 0 0 2.91-3.63a1 1 0 0 0 0-1c-.64-1.11-4.16-6.68-10.14-6.5a9.5 9.5 0 0 0-3.23.67Zm12.12 13.53L19.41 18l-2-2l-9.52-9.53L6.42 5L4.71 3.29a1 1 0 0 0-1.42 1.42L5.53 7l1.75 1.7l7.31 7.3l.07.07L16 17.41l.59.59l2.7 2.71a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42"
    />
  </SvgIcon>
));
