import { DashboardLayout } from "@pency/ui/layouts";
import { Left } from "./left";
import { Right } from "./right";

export function Header() {
  return (
    <DashboardLayout.Header
      slots={{
        left: <Left />,
        right: <Right />,
      }}
    />
  );
}
