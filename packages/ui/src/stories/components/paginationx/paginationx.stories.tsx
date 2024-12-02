import { usePaginationx } from "@/components";
import { PaginationItem } from "@mui/material";
import { Meta } from "@storybook/react";

const meta: Meta = {
  title: "components/SegmentedButton",
};

export default meta;

export const Default = () => {
  const pages = usePaginationx({ totalCount: 21, currentPage: 2 });

  return (
    <>
      {pages.map((page) => (
        <PaginationItem />
      ))}
    </>
  );
};
