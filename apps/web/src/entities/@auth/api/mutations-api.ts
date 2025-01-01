import { apiClient } from "@/shared/lib/ky/api-client";

type LoginReq = {
  email: string;
  password: string;
};

export const login = async (req: LoginReq) => {
  return await apiClient.post("auth/login", { json: req }).json();
};

// ----------------------------------------------------------------------

export const logout = async () => {
  return await apiClient.post("auth/logout").json();
};

// ----------------------------------------------------------------------
