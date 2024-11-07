import { Layout } from "@/_route/(web)/(auth)/layout";
import "@pency/ui/global.css";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return <Layout>{children}</Layout>;
}
