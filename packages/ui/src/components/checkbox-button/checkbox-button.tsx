"use client";

import { Box, BoxProps, Button, ButtonProps, useTheme } from "@mui/material";
import { PropsWithoutRef, useRef } from "react";

type CheckboxButtonProps = PropsWithoutRef<
  BoxProps<
    "input",
    {
      slotProps: {
        button: ButtonProps;
      };
      children?: React.ReactNode;
    }
  >
>;

export function CheckboxButton({ checked, children, slotProps, ...rest }: CheckboxButtonProps) {
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <Button
        color={checked ? "primary" : "inherit"}
        variant="soft"
        {...slotProps.button}
        onClick={handleClick}
        sx={{
          fontWeight: theme.typography.fontWeightSemiBold,
          ...slotProps.button.sx,
        }}
      >
        {children}
      </Button>
      <Box ref={inputRef} component="input" type="checkbox" checked={checked} sx={{ display: "none" }} {...rest} />
    </>
  );
}
