import { RequireUser } from "@/entities/@auth";
import { LibraryLayout } from "./_layout/_layout";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <RequireUser>
      <LibraryLayout>{children}</LibraryLayout>
    </RequireUser>
  );
}
