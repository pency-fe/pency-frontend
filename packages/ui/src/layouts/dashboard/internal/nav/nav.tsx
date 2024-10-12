import { v4 as uuidv4 } from "uuid";
import { Stack } from "@mui/material";
import { Data } from "../types";
import { NavUl } from "../nav-ul";
import { Group } from "./group";

type Props = {
  data: Data;
};

export function Nav({ data }: Props) {
  return (
    <Stack
      component="nav"
      sx={{
        px: 2,
        flex: "1 1 auto",
      }}
    >
      <NavUl>
        {data.map((group) => (
          <Group key={uuidv4()} data={group} />
        ))}
      </NavUl>
    </Stack>
  );
}
