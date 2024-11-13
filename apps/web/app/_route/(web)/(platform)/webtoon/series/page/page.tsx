"use client";

import { Button, ButtonProps, RadioGroup, useRadioGroup, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { MouseEventHandler, useState } from "react";

export function SeriesPage() {
  const [state, setState] = useState("");
  // return Array.from({ length: 100 }).map((v, i) => <p key={i}>webtoon series</p>);
  console.log(state);
  return (
    <>
      {state}

      <RadioGroup
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
      >
        <Grid2 container columnSpacing={1}>
          <Grid2>
            <RadioButton value="action1">오리지널</RadioButton>
          </Grid2>
          <Grid2>
            <RadioButton value="action2">1차창작</RadioButton>
          </Grid2>
          <Grid2>
            <RadioButton value="action3">N차창작</RadioButton>
          </Grid2>
        </Grid2>
      </RadioGroup>
    </>
  );
}

type RadioButtonProps = ButtonProps & { value: string };

const RadioButton = ({ value, children, ...rest }: RadioButtonProps) => {
  const radioGroup = useRadioGroup();
  const theme = useTheme();

  if (!radioGroup) throw new Error("<RadioButton />의 부모로 <RadioGroup /> 컴포넌트가 있어야 합니다.");

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    radioGroup.onChange(e as unknown as React.ChangeEvent<HTMLInputElement>, value);
  };
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
};
