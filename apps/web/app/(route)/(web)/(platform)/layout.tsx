import { PlatformLayout } from "@/_route/(web)/(platform)/layout";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <PlatformLayout>{children}</PlatformLayout>;
}
