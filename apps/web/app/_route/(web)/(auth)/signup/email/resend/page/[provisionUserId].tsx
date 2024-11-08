"use client";

import { useSearchParams } from "next/navigation";

export function ResendPage() {
  const searchParams = useSearchParams();
  const provisionUserId = searchParams.get("provisionUserId");
  return <div>signup email resend {provisionUserId} page</div>;
}
