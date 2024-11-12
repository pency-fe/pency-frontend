import { api } from "_core/api";

type GetMeRes = {
  userId: string | null;
  userProfileId: string | null;
  isLoggedIn: boolean;
};

export const getMe = async () => {
  return await api.get<GetMeRes>("user/me").json();
};

// ----------------------------------------------------------------------
