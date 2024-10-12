import { Data } from "../types";
import { NavLi } from "../nav-li";
import { v4 as uuidv4 } from "uuid";
import { useMemo } from "react";
import { NavUl, navUlToken } from "../nav-ul";
import { NavList } from "./nav-list";

type Props = {
  data: Data[number];
};

export function Group({ data }: Props) {
  const renderContent = useMemo(
    () => (
      <NavUl
        sx={(theme) => ({
          [navUlToken.gap]: theme.spacing(0.5),
        })}
      >
        {data.items.map((item) => (
          <NavList key={uuidv4()} data={item} />
        ))}
      </NavUl>
    ),
    [data],
  );

  return <NavLi>{renderContent}</NavLi>;
}
