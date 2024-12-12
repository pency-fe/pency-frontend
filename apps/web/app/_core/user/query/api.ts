import { Options } from "ky";
import { api } from "_core/api";

// ----------------------------------------------------------------------

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

type GetAuthMeRes =
  | {
      userId: number;
      userProfileId: number;
      isLoggedIn: true;
    }
  | {
      userId: null;
      userProfileId: null;
      isLoggedIn: false;
    };

export const getAuthMe = async (options?: Options) => {
  return await api.get<GetAuthMeRes>("auth/me", options).json();
};
