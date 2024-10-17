import { forwardRef, useMemo } from "react";
import type { BoxProps } from "@mui/material/Box";
import { Box, useTheme } from "@mui/material";
import { LabelColor, LabelVariant } from "./types";
import { StyledLabel } from "./styled-label";

interface Props extends BoxProps {
  color?: LabelColor;
  variant?: LabelVariant;
  slots?: {
    startIcon?: React.ReactElement;
    endIcon?: React.ReactElement;
  };
}

export const Label = forwardRef<HTMLSpanElement, Props>(
  ({ color = "default", variant = "soft", slots, sx, children, ...rest }, ref) => {
    const theme = useTheme();

    const iconStyles = useMemo(
      () => ({
        width: 16,
        height: 16,
        "& svg, img": {
          width: 1,
          height: 1,
          objectFit: "cover",
        },
      }),
      [],
    );

    return (
      <StyledLabel
        ref={ref}
        component="span"
        theme={theme}
        ownerState={{ color, variant }}
        sx={{ ...(slots?.startIcon && { pl: 0.75 }), ...(slots?.endIcon && { pr: 0.75 }), ...sx }}
        {...rest}
      >
        {slots?.startIcon && (
          <Box component="span" sx={{ mr: 0.75, ...iconStyles }}>
            {slots.startIcon}
          </Box>
        )}

        {children}

        {slots?.endIcon && (
          <Box component="span" sx={{ ml: 0.75, ...iconStyles }}>
            {slots.endIcon}
          </Box>
        )}
      </StyledLabel>
    );
  },
);
