import { forwardRef } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

/**
 * @description
 * https://icon-sets.iconify.design/eva/arrow-ios-back-fill/
 */
export const BrandNaverIcon = forwardRef<SVGSVGElement, SvgIconProps>((rest, ref) => (
  <SvgIcon ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.56 4v7.84L9.44 4H4v16h5.44v-8l5.12 8H20V4h-5.44Z"
      fill="#00BD39"
    ></path>
  </SvgIcon>
));
