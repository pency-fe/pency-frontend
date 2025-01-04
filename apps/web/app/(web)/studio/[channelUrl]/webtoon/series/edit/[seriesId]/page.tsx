import { StudioWtSeriesUpdatePage } from "@/pages/studio-wt-series";
import { StudioHeaderTitle } from "@/widgets/layout";

export default function Page() {
  return (
    <>
      <StudioHeaderTitle title="웹툰 시리즈 수정" back />
      <StudioWtSeriesUpdatePage />
    </>
  );
}
