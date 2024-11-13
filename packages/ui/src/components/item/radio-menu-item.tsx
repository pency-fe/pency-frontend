import { MenuItem, menuItemClasses, MenuItemProps, useRadioGroup, useTheme } from "@mui/material";
import { MouseEventHandler, useCallback } from "react";

type RadioMenuItemProps = MenuItemProps<"button"> & { value: string };

export function RadioMenuItem({ value, ...rest }: RadioMenuItemProps) {
  const radioGroup = useRadioGroup();
  const theme = useTheme();

  if (!radioGroup) throw new Error("<RadioMenuItem />의 부모로 <RadioGroup /> 컴포넌트가 있어야 합니다.");

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      radioGroup.onChange(e as unknown as React.ChangeEvent<HTMLInputElement>, value);
    },
    [radioGroup, value],
  );

  return (
    <>
      <MenuItem
        {...rest}
        component="button"
        name={radioGroup.name}
        value={value}
        selected={value === radioGroup.value}
        onClick={handleClick}
        sx={{
          px: "14px",
          py: "8px",
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.vars.palette.text.secondary,
          fontSize: "15px",
          lineHeight: "1.45",
          [`&.${menuItemClasses.selected}`]: {
            color: theme.vars.palette.text.primary,
          },
          ...rest.sx,
        }}
      />
    </>
  );
}
