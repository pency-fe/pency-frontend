import { DashboardLayout } from "@pency/ui/layouts";
import { navData } from "../nav-data";
import { useTheme } from "@mui/material";

export function Sidebar() {
  const theme = useTheme();

  return <DashboardLayout.Sidebar data={navData} />;
}
