import { LibraryLayout } from "./_layout/layout";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <LibraryLayout>{children}</LibraryLayout>;
}
