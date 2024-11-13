"use client";

import { Button, ButtonProps, useRadioGroup, useTheme } from "@mui/material";
import { MouseEventHandler, useCallback } from "react";

type RadioButtonProps = ButtonProps & { value: string };

export function RadioButton({ value, children, ...rest }: RadioButtonProps) {
  const radioGroup = useRadioGroup();
  const theme = useTheme();

  if (!radioGroup) throw new Error("<RadioButton />의 부모로 <RadioGroup /> 컴포넌트가 있어야 합니다.");

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      radioGroup.onChange(e as unknown as React.ChangeEvent<HTMLInputElement>, value);
    },
    [radioGroup, value],
  );
  return (
    <Button
      color={value === radioGroup.value ? "primary" : "inherit"}
      variant="soft"
      {...rest}
      name={radioGroup.name}
      value={value}
      onClick={handleClick}
      sx={{
        fontWeight: theme.typography.fontWeightSemiBold,
        ...rest.sx,
      }}
    >
      {children}
    </Button>
  );
}
