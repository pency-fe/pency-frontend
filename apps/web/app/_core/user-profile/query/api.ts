import { api } from "_core/api";
import { Options } from "ky";

/** **************************************
 * user-profile-me
 *************************************** */

// ----------------------------------------------------------------------

type UserProfileMeListRes = Array<{
  id: number;
  url: string;
  nickname: string;
  image: string;
}>;

export const getUserProfileMeList = async (option?: Options) => {
  return await api.get<UserProfileMeListRes>("user-profile/me/list", option).json();
};

// ----------------------------------------------------------------------
