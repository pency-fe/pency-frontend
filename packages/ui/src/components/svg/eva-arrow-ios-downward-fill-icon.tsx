import { forwardRef } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

/**
 * @description
 * https://icon-sets.iconify.design/eva/arrow-ios-downward-fill/
 */
export const EvaArrowIosDownwardFillIcon = forwardRef<SVGSVGElement, SvgIconProps>((rest, ref) => (
  <SvgIcon ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
    <path
      fill="currentColor"
      d="M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15a1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16"
    />
  </SvgIcon>
));
