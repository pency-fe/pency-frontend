import { RadioButton } from "@/components";
import { Box, Grid, RadioGroup } from "@mui/material";
import { Meta } from "@storybook/react";
import { useState } from "react";

const meta: Meta = {
  title: "components/RadioButton",
};

export default meta;

export const Design1 = () => {
  const [state, setState] = useState("");

  return (
    <RadioGroup
      value={state}
      onChange={(e) => {
        setState(e.target.value);
      }}
    >
      <Grid container spacing={1}>
        {/* 디자인에 맞게 xs 알아서 수정 */}
        <Grid item xs={4}>
          <RadioButton value="action1" fullWidth>
            액션1
          </RadioButton>
        </Grid>
        <Grid item xs={4}>
          <RadioButton value="action2" fullWidth>
            액션2
          </RadioButton>
        </Grid>
        <Grid item xs={4}>
          <RadioButton value="action3" fullWidth>
            액션3
          </RadioButton>
        </Grid>
        <Grid item xs={4}>
          <RadioButton value="action4" fullWidth>
            액션4
          </RadioButton>
        </Grid>
        <Grid item xs={4}>
          <RadioButton value="action5" fullWidth>
            액션5
          </RadioButton>
        </Grid>
      </Grid>
    </RadioGroup>
  );
};

export const Design2 = () => {
  const [state, setState] = useState("");

  return (
    <RadioGroup
      value={state}
      onChange={(e) => {
        setState(e.target.value);
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {/* 글자 수에 맞게 알맞게 rem 수정 */}
        {/* ex. 글자 수(4rem) + 오프셋(1rem) = 5rem */}
        <RadioButton value="action1" sx={{ width: "5rem" }}>
          오리지널
        </RadioButton>

        <RadioButton value="action2" sx={{ width: "5rem" }}>
          1차창작
        </RadioButton>

        <RadioButton value="action3" sx={{ width: "5rem" }}>
          N차창작
        </RadioButton>
      </Box>
    </RadioGroup>
  );
};
