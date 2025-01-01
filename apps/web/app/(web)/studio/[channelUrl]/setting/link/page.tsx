import { StudioSettingLinkPage } from "@/pages/studio-setting";
import { StudioHeaderTitle } from "@/widgets/layout";

export default function Page() {
  return (
    <>
      <StudioHeaderTitle title="소셜 링크" back />
      <StudioSettingLinkPage />
    </>
  );
}
