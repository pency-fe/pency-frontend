import { forwardRef } from "react";
import { SvgIcon, SvgIconProps, useTheme } from "@mui/material";

/**
 * @description
 * https://icon-sets.iconify.design/eva/arrow-ios-back-fill/
 */
export const BrandAppleIcon = forwardRef<SVGSVGElement, SvgIconProps>((rest, ref) => {
  const theme = useTheme();

  return (
    <SvgIcon
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...rest}
      sx={{ fill: theme.palette.logo }}
    >
      <path d="M17.624 11.58c0-1.652.76-2.857 2.232-3.795-.848-1.205-2.098-1.83-3.75-1.964-1.607-.134-3.348.893-3.972.893-.67 0-2.188-.848-3.393-.848-2.5.044-5.134 1.964-5.134 5.937 0 1.16.179 2.366.625 3.616.58 1.651 2.634 5.669 4.777 5.58 1.116 0 1.92-.804 3.392-.804 1.429 0 2.143.803 3.393.803 2.187 0 4.062-3.66 4.598-5.312-2.902-1.383-2.768-4.017-2.768-4.106Zm-2.5-7.321C16.33 2.83 16.196 1.49 16.196 1c-1.072.09-2.322.759-3.036 1.562-.803.893-1.25 2.01-1.16 3.214 1.16.09 2.232-.49 3.124-1.517Z"></path>
    </SvgIcon>
  );
});
