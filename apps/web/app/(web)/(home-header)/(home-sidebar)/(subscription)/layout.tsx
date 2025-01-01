import { RequireUser } from "@/entities/@auth";
import { SubscriptionLayout } from "./_layout/_layout";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <RequireUser>
      <SubscriptionLayout>{children}</SubscriptionLayout>
    </RequireUser>
  );
}
