import { wtSeriesKeys } from "@/entities/wt-series";
import { PickQueryOptionsData } from "@/shared/lib/react-query/types";

type Props = {
  data: PickQueryOptionsData<ReturnType<typeof wtSeriesKeys.page>>["serieses"][number];
};

export type FeedbackButtonComponent = (props: Props) => React.ReactNode;
