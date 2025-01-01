import { apiClient } from "@/shared/lib/ky/api-client";

type GetProvisionUserReq = {
  id: number;
};

type GetProvisionUserRes = { email: string };

export const getProvisionUser = async (req: GetProvisionUserReq) => {
  return await apiClient.get<GetProvisionUserRes>(`provision-user/${req.id}`).json();
};
