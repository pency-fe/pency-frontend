import ChannelUrlLayout from "./_layout/_layout";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <ChannelUrlLayout>{children}</ChannelUrlLayout>;
}
