"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";

export function useChannelUrlParam() {
  const channelUrl = useParams<{ channelUrl: string }>()["channelUrl"];

  return useMemo(() => decodeURIComponent(channelUrl), [channelUrl]);
}
