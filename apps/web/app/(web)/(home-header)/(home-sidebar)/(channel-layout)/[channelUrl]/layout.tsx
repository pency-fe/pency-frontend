import { ChannelUrlLayout } from "@/pages/channel-url";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <ChannelUrlLayout>{children}</ChannelUrlLayout>;
}
