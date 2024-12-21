import { RadioMenuItem } from "../../../components";
import { RadioGroup } from "@mui/material";
import { Meta } from "@storybook/react";
import { useState } from "react";

const meta: Meta = {
  title: "components/item/RadioMenuItem",
};

export default meta;

export const Default = () => {
  const [state, setState] = useState("");
  return (
    <>
      <RadioGroup
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
      >
        <RadioMenuItem value="item1">아이템1</RadioMenuItem>
        <RadioMenuItem value="item2">아이템2</RadioMenuItem>
        <RadioMenuItem value="item3">아이템3</RadioMenuItem>
        <RadioMenuItem value="item4">아이템4</RadioMenuItem>
        <RadioMenuItem value="item5">아이템5</RadioMenuItem>
      </RadioGroup>
    </>
  );
};
