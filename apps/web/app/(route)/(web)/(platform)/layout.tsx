import { Layout } from "@/_route/(web)/(platform)/layout";

type Props = {
  children: React.ReactNode;
};

export default function PlatformLayout({ children }: Props) {
  return <Layout>{children}</Layout>;
}
