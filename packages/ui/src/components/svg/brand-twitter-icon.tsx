import { forwardRef } from "react";
import { SvgIcon, SvgIconProps, useTheme } from "@mui/material";

export const BrandTwitterIcon = forwardRef<SVGSVGElement, SvgIconProps>((rest, ref) => {
  const theme = useTheme();

  return (
    <SvgIcon
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...rest}
      sx={{ fill: theme.vars.palette.logo.twitter, ...rest.sx }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.77 12.775 3.343 20H6.19l4.92-5.544L15.448 20 21 19.97l-7.04-9.164 6.008-6.775L17.166 4l-4.539 5.091-3.883-5.083L3 4.002l6.77 8.773Zm7.867 5.561-1.437-.004L6.326 5.608h1.546l9.765 12.728Z"
      ></path>
    </SvgIcon>
  );
});
