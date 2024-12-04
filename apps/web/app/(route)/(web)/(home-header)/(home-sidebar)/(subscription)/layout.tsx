import { SubscriptionLayout } from "./_layout/layout";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <SubscriptionLayout>{children}</SubscriptionLayout>;
}
