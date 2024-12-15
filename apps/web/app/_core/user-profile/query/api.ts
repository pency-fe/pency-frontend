import { api } from "_core/api";

// ----------------------------------------------------------------------

type UserProfileMeListRes = Array<{
  id: number;
  url: string;
  nickname: string;
  image: string;
}>;

export const getUserProfileMeList = async () => {
  return await api.get<UserProfileMeListRes>("user-profile/me/list").json();
};

// ----------------------------------------------------------------------
