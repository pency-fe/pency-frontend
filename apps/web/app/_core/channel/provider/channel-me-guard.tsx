"use client";

import { useQuery } from "@tanstack/react-query";
import { useChannelUrlParam } from "_hooks";
import { channelMeKeys } from "../query";
import { notFound } from "next/navigation";
import { AccessDenied } from "_views";

export const ChannelMeGuard = ({ children }: { children?: React.ReactNode }) => {
  const channelUrl = useChannelUrlParam();
  const { status, error } = useQuery(channelMeKeys.guard({ url: channelUrl }));

  if (status === "pending") {
    return;
  }

  if (status === "error") {
    if (error.code === "ENTITY_NOT_FOUND") {
      notFound();
    }

    if (error.code === "ACCESS_DENIED") {
      return <AccessDenied />;
    }
  }

  return children;
};
