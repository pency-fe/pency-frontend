import { Options } from "ky";
import { apiClient } from "@/shared/lib/ky/api-client";

type UserProfileMeListRes = Array<{
  id: number;
  url: string;
  nickname: string;
  image: string;
}>;

export const getUserProfileMeList = async (option?: Options) => {
  return await apiClient.get<UserProfileMeListRes>("user-profile/me/list", option).json();
};
