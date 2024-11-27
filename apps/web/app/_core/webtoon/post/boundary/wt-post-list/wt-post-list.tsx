"use client";

import { withAsyncBoundary } from "@pency/util";
import { useQuery } from "@tanstack/react-query";
import { wtPostKeys } from "../../query";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export const WebtoonPostList = withAsyncBoundary(WebtoonPostListFn, {
  suspense: { fallback: <div>로딩중...</div> },
  errorBoundary: {
    FallbackComponent: <div>에러 발생!</div>,
  },
});

function WebtoonPostListFn() {
  const searchParams = useSearchParams();
  const genre = useMemo(() => {
    return searchParams.get("genre");
  }, []);
  const sort = useMemo(() => {
    return searchParams.get("sort");
  }, []);
  const page = useMemo(() => {
    return searchParams.get("page");
  }, []);

  const { data } = useQuery(wtPostKeys.list({ genre, sort, page }));
  return <></>;
}
