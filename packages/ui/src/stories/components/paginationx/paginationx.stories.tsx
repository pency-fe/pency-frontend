import { usePaginationx } from "@/hooks";
import { PaginationItem } from "@mui/material";
import { Meta } from "@storybook/react";

const meta: Meta = {
  title: "components/PaginationItem",
};

export default meta;

// 실제로 코드 작성할 때는 주석 처리된 부분들을 이용하세요.
export const Default = () => {
  // const searchParams = useSearchParams();
  // const pageParam = useMemo(() => {
  //   const param = Number(searchParams.get("page"));
  //   if (param && !isNaN(param) && param >= 1) {
  //     return param;
  //   }
  //   return 1;
  // }, [searchParams]);

  // const paginations = usePaginationx({ totalCount: 20, currentPage: pageParam });

  const paginations = usePaginationx({ totalCount: 20, currentPage: 2 });

  return (
    <>
      {paginations.map((pagination) => {
        // const params = new URLSearchParams(searchParams.toString());
        // params.set("page", `${pagination.page}`);
        // return <PaginationItem component={NextLink} href={`/webtoon/post/list${createQueryString(params)}`} {...pagination} />;
        return <PaginationItem {...pagination} />;
      })}
    </>
  );
};
