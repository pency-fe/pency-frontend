import { DashboardLayout } from "@pency/ui/layouts";
import { navData } from "./nav-data";

type Props = {
  children: React.ReactNode;
};

export function HomeLayout({ children }: Props) {
  return (
    <DashboardLayout
      slots={{
        header: <DashboardLayout.Header data={navData} />,
        sidebar: <DashboardLayout.Sidebar data={navData} />,
        footer: <>Footer</>,
      }}
    >
      {children}
    </DashboardLayout>
  );
}
