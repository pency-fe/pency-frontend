import { DashboardLayout } from "@pency/ui/layouts";
import { navData } from "./nav-data";
import { useTheme } from "@mui/material";
import { MiniNav, Nav } from "@pency/ui/components";

export function Sidebar() {
  const theme = useTheme();

  return (
    <DashboardLayout.Sidebar
      slots={{
        smUpNav: <MiniNav data={navData} />,
        lgUpNav: <Nav data={navData} />,
      }}
    />
  );
}
