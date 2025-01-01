import { RequireUser } from "@/entities/@auth";
import { WtPostIdEditorPage } from "@/pages/wt-post-editor";

export default function Page() {
  return (
    <RequireUser>
      <WtPostIdEditorPage />
    </RequireUser>
  );
}
