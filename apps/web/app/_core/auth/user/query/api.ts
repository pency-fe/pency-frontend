import { api } from "_core/api";

type LoginReq = {
  email: string;
  password: string;
};

export const login = async (req: LoginReq) => {
  return await api.post("auth/login", { json: req }).json();
};

// ----------------------------------------------------------------------

export const logout = async () => {
  return await api.post("auth/logout").json();
};

// ----------------------------------------------------------------------
