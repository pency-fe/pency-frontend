import { RequireGuest } from "@/entities/@auth";
import { AuthLayout } from "@/widgets/layout";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <RequireGuest>
      <AuthLayout>{children}</AuthLayout>
    </RequireGuest>
  );
}
