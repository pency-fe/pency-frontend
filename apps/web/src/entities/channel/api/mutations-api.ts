import { apiClient } from "@/shared/lib/ky/api-client";

// ----------------------------------------------------------------------

type BlockReq = {
  id: number;
};

export const block = async (req: BlockReq) => {
  return await apiClient.post(`channel/${req.id}/block`).json();
};

// ----------------------------------------------------------------------

type UnblockReq = {
  id: number;
};

export const unblock = async (req: UnblockReq) => {
  return await apiClient.delete(`channel/${req.id}/block`).json();
};

// ----------------------------------------------------------------------
