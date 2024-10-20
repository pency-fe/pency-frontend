import { forwardRef } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

/**
 * @description
 * https://icon-sets.iconify.design/fluent/draw-text-24-filled/
 */
export const FluentDrawText24FilledIcon = forwardRef<SVGSVGElement, SvgIconProps>((rest, ref) => (
  <SvgIcon ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
    <path
      fill="currentColor"
      d="M12.243 13.149H7.758L10 6.744zm.7 2l.328.935l1.569-1.57l-3.764-10.751c-.357-1.017-1.795-1.017-2.15 0L4.055 17.67a1 1 0 1 0 1.888.661l1.114-3.182zm.254 2.423l5.902-5.902a2.285 2.285 0 1 1 3.233 3.232l-5.903 5.902a2.7 2.7 0 0 1-1.247.707l-1.83.457q-.075.02-.15.027c-.59.204-2.979.574-3.827-.088c-.574-.448-.46-1.334-.218-1.818c.04-.078-.02-.18-.105-.166c-.66.103-1.243.45-1.827.799c-.783.468-1.57.936-2.549.815s-1.468-.726-1.71-1.255c-.099-.216.18-.401.388-.287c.469.255 1.106.496 1.631.38c.375-.084.904-.458 1.496-.877c1.066-.753 2.337-1.653 3.292-1.268c.84.337 1.46 1.15 1.03 2.113c-.052.118 0 .264.127.293c.423.097.778.066 1.133-.105l.428-1.712c.118-.472.362-.903.706-1.247"
    />
  </SvgIcon>
));
