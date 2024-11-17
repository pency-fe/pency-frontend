import { forwardRef } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

/**
 * @description
 * https://icon-sets.iconify.design/nimbus/drag-dots/
 */
export const NimbusDragDotsIcon = forwardRef<SVGSVGElement, SvgIconProps>((rest, ref) => (
  <SvgIcon ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...rest}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.375 3.67c0-.645-.56-1.17-1.25-1.17s-1.25.525-1.25 1.17c0 .646.56 1.17 1.25 1.17s1.25-.524 1.25-1.17m0 8.66c0-.646-.56-1.17-1.25-1.17s-1.25.524-1.25 1.17s.56 1.17 1.25 1.17s1.25-.525 1.25-1.17m-1.25-5.5c.69 0 1.25.525 1.25 1.17s-.56 1.17-1.25 1.17s-1.25-.525-1.25-1.17s.56-1.17 1.25-1.17m5-3.16c0-.645-.56-1.17-1.25-1.17s-1.25.525-1.25 1.17c0 .646.56 1.17 1.25 1.17s1.25-.524 1.25-1.17m-1.25 7.49c.69 0 1.25.524 1.25 1.17s-.56 1.17-1.25 1.17s-1.25-.525-1.25-1.17c0-.646.56-1.17 1.25-1.17M11.125 8c0-.645-.56-1.17-1.25-1.17s-1.25.525-1.25 1.17s.56 1.17 1.25 1.17s1.25-.525 1.25-1.17"
    />
  </SvgIcon>
));
