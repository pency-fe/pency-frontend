import { api } from "_core/api";
import { Options } from "ky";

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

// ----------------------------------------------------------------------
