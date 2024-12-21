"use client";

import { useQuery } from "@tanstack/react-query";
import { useChannelUrlParam } from "_hooks";
import { channelMeKeys } from "../query";
import { notFound } from "next/navigation";

export const ChannelMeGuard = ({ children }: { children?: React.ReactNode }) => {
  const channelUrl = useChannelUrlParam();
  const { status, error } = useQuery({ ...channelMeKeys.guard({ url: channelUrl }), refetchOnMount: false, gcTime: 0 });

  if (status === "pending") {
    return;
  }

  if (status === "error") {
    if (error.code === "ENTITY_NOT_FOUND") {
      notFound();
    }

    if (error.code === "ACCESS_DENIED") {
      throw error;
    }

    throw error;
  }

  return children;
};
