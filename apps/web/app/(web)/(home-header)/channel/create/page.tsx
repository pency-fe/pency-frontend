import { RequireUser } from "@/entities/@auth";
import { ChannelCreatePage } from "@/pages/channel-create";

export default function Page() {
  return (
    <RequireUser>
      <ChannelCreatePage />
    </RequireUser>
  );
}
