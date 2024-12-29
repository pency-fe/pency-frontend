import { Options } from "ky";
import { apiClient } from "@/shared/lib/ky/api-client";

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
  return await apiClient.get<GetUserAuthMeRes>("user/auth/me", options).json();
};
