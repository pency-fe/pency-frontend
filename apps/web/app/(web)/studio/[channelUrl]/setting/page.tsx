import { StudioSettingPage } from "@/pages/studio-setting";
import { StudioHeaderTitle } from "@/widgets/layout";

export default function Page() {
  return (
    <>
      <StudioHeaderTitle title="설정" />
      <StudioSettingPage />
    </>
  );
}
