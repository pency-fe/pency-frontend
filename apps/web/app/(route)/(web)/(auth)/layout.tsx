import { AuthLayout } from "@/_route/(web)/(auth)/layout";
import "@pency/ui/global.css";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <AuthLayout>{children}</AuthLayout>;
}
