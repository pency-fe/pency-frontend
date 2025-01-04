import { RequireUser } from "@/entities/@auth";
import { LibraryLayout } from "@/pages/library";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RequireUser>
      <LibraryLayout>{children}</LibraryLayout>
    </RequireUser>
  );
}
