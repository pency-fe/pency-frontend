import { LayoutSection } from "../core";

type Props = {
  children: React.ReactNode;
};

export function DashboardLayout({ children }: Props) {
  return <LayoutSection>{children}</LayoutSection>;
}
