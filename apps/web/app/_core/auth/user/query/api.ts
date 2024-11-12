import { api } from "_core/api";
import { Options } from "ky";

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

type GetMeRes =
  | {
      userId: string;
      userProfileId: string;
      isLoggedIn: true;
    }
  | {
      userId: null;
      userProfileId: null;
      isLoggedIn: false;
    };

export const getMe = async (options?: Options) => {
  return await api.get<GetMeRes>("user/me", options).json();
};
