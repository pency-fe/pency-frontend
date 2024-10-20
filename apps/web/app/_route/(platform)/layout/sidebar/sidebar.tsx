import { DashboardLayout } from "@pency/ui/layouts";
import { navData } from "../nav-data";

export function Sidebar() {
  return <DashboardLayout.Sidebar data={navData} />;
}
