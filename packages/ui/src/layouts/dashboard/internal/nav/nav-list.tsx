import { useMemo } from "react";
import { NavLi } from "../nav-li";
import { Data } from "../types";
import { NavItem } from "./nav-item";

type Props = {
  data: Data[number]["items"][number];
};

export function NavList({ data }: Props) {
  const renderNavItem = useMemo(() => <NavItem data={data} />, [data]);

  return <NavLi>{renderNavItem}</NavLi>;
}
