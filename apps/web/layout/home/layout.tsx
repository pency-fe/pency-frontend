import { DashboardLayout } from "@pency/ui/layouts";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

type Props = {
  children: React.ReactNode;
};

export function HomeLayout({ children }: Props) {
  return (
    <DashboardLayout
      slots={{
        header: <Header />,
        sidebar: <Sidebar />,
        footer: <>Footer</>,
      }}
    >
      {children}
    </DashboardLayout>
  );
}
