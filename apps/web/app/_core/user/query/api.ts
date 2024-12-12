import { Options } from "ky";
import { api } from "_core/api";

// ----------------------------------------------------------------------

type LoginReq = {
  email: string;
  password: string;
};

export const login = async (req: LoginReq) => {
  return await api.post("user/auth/me/login", { json: req }).json();
};

// ----------------------------------------------------------------------

export const logout = async () => {
  return await api.post("user/auth/me/logout").json();
};

// ----------------------------------------------------------------------

type GetUserAuthMeRes =
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

export const getUserAuthMe = async (options?: Options) => {
  return await api.get<GetUserAuthMeRes>("user/auth/me", options).json();
};
