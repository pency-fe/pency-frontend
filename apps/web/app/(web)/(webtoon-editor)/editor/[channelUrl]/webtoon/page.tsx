import { RequireUser } from "@/entities/@auth";
import { WtPostEditorPage } from "@/pages/wt-post-editor";

export default function Page() {
  return (
    <RequireUser>
      <WtPostEditorPage />
    </RequireUser>
  );
}
