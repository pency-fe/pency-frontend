import { forwardRef } from "react";
import { Icon, IconProps, disableCache } from "@iconify/react";
import type { BoxProps } from "@mui/material/Box";
import { Box, NoSsr } from "@mui/material";

export const Iconify = forwardRef<SVGElement, IconProps & BoxProps>(({ sx, ...rest }, ref) => {
  return (
    <NoSsr>
      <Box ref={ref} component={Icon} sx={{ width: 1, height: 1, ...sx }} {...rest} />
    </NoSsr>
  );
});

// https://iconify.design/docs/iconify-icon/disable-cache.html
disableCache("local");
