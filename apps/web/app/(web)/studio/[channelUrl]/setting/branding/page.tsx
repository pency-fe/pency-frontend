import { StudioSettingBrandingPage } from "@/pages/studio-setting";
import { StudioHeaderTitle } from "@/widgets/layout";

export default function Page() {
  return (
    <>
      <StudioHeaderTitle title="채널 정보" back />
      <StudioSettingBrandingPage />
    </>
  );
}
