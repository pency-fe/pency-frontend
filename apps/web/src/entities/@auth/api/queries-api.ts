import { Options } from "ky";
import { apiClient } from "@/shared/lib/ky/api-client";

type GetAuthRes =
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

export const getAuth = async (options?: Options) => {
  return await apiClient.get<GetAuthRes>("auth", options).json();
};
