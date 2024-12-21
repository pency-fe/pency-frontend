import { SegmentedButton, SegmentedButtonGroup } from "../../../components";
import { Meta } from "@storybook/react";
import { useState } from "react";

const meta: Meta = {
  title: "components/SegmentedButton",
};

export default meta;

export const Default = () => {
  const [sort, setSort] = useState<"LATEST" | "POPULAR">("LATEST");

  return (
    <SegmentedButtonGroup
      value={sort}
      exclusive
      onChange={(_, value) => {
        if (value !== null) {
          setSort(value);
        }
      }}
    >
      <SegmentedButton disableFocusRipple disableRipple value="LATEST">
        최신순
      </SegmentedButton>
      <SegmentedButton value="POPULAR">인기순</SegmentedButton>
    </SegmentedButtonGroup>
  );
};
