import { forwardRef } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

/**
 * @description
 * https://icon-sets.iconify.design/eva/arrow-ios-back-fill/
 */
export const BrandGoogleIcon = forwardRef<SVGSVGElement, SvgIconProps>((rest, ref) => (
  <SvgIcon ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.12 12.216c0-.674-.06-1.321-.173-1.943H12v3.675h5.113a4.37 4.37 0 0 1-1.896 2.867v2.383h3.07c1.797-1.654 2.833-4.089 2.833-6.982Z"
      fill="#4285F4"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 21.5c2.565 0 4.715-.85 6.287-2.302l-3.07-2.383c-.85.57-1.939.907-3.217.907-2.474 0-4.569-1.672-5.316-3.917H3.51v2.461A9.496 9.496 0 0 0 12 21.5Z"
      fill="#34A853"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.684 13.805A5.71 5.71 0 0 1 6.386 12c0-.626.108-1.235.298-1.805V7.734H3.51A9.497 9.497 0 0 0 2.5 12c0 1.533.367 2.984 1.01 4.266l3.174-2.461Z"
      fill="#FBBC05"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 6.278c1.395 0 2.647.48 3.632 1.421l2.724-2.725C16.711 3.441 14.561 2.5 12 2.5a9.496 9.496 0 0 0-8.49 5.234l3.174 2.461C7.431 7.95 9.526 6.278 12 6.278Z"
      fill="#EA4335"
    ></path>
  </SvgIcon>
));
