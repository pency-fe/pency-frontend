import { Meta } from "@storybook/react";
import { Button } from "@mui/material";

const meta: Meta = {
  title: "mui/Buttons",
};

export default meta;

export const Buttons = () => {
  return <Button variant="contained">Testing</Button>;
};
