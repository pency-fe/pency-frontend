import "@pency/ui/global.css";
import { AuthLayout } from "./_layout/layout";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <AuthLayout>{children}</AuthLayout>;
}
