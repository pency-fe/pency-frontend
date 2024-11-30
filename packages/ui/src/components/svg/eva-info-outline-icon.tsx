import { forwardRef } from "react";
import { SvgIcon, SvgIconProps, useTheme } from "@mui/material";

/**
 * @description
 * https://icon-sets.iconify.design/eva/info-outline/
 */
export const EvaInfoOutlineIcon = forwardRef<SVGSVGElement, SvgIconProps>((rest, ref) => {
  const theme = useTheme();

  return (
    <SvgIcon
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...rest}
      sx={{ fill: theme.vars.palette.logo.apple, ...rest.sx }}
    >
      <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
      <path fill="currentColor" d="M12 10a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0v-5a1 1 0 0 0-1-1" />
    </SvgIcon>
  );
});
