"use client";

import { useMemo } from "react";
import { QueryError } from "_core/api";
import { useRouter } from "next/navigation";
import { AccessDenied } from "_views";

export function QueryErrorFallback({ error, children }: { error: Error; children?: React.ReactNode }) {
  const router = useRouter();

  console.log("queryErrorBoundary", error);

  if (!(error instanceof QueryError)) {
    throw error;
  }

  // 로그인 되어 있지 않아요.
  // 활성화된 회원이 아니에요.
  if (error.code === "UNAUTHORIZED_USER" || error.code === "NOT_ACTIVE_USER") {
    router.push("/login");
    return;
  }

  const render = useMemo(() => {
    // 권한이 없어요.
    if (error.code === "ACCESS_DENIED") {
      return <AccessDenied />;
    }

    // 예기치 못한 오류가 발생했어요.
    if (error.code === "UNEXPECTED_EXCEPTION") {
      return <div>TODO: 예기치 못한 오류가 발생했어요.</div>;
    }
  }, [error]);

  return render ? render : children;
}
