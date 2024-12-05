"use client";

import { Button, ButtonProps, useTheme } from "@mui/material";

type CheckboxButtonProps = ButtonProps & { value: string; checked: boolean };

export function CheckboxButton({ value, checked, children, ...rest }: CheckboxButtonProps) {
  const theme = useTheme();

  return (
    <Button
      color={checked ? "primary" : "inherit"}
      variant="soft"
      {...rest}
      value={value}
      sx={{
        fontWeight: theme.typography.fontWeightSemiBold,
        ...rest.sx,
      }}
    >
      {children}
    </Button>
  );
}
