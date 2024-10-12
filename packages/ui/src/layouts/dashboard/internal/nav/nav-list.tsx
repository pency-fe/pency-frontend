import { NavLi } from "../nav-li";
import { Data } from "../../types";
import { NavItem } from "./nav-item";

type Props = {
  data: Data[number]["items"][number];
};

export function NavList({ data }: Props) {
  return (
    <NavLi>
      <NavItem data={data} />
    </NavLi>
  );
}
