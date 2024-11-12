import { api } from "_core/api";

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

export const getMe = async () => {
  return await api.get<GetMeRes>("user/me").json();
};

// ----------------------------------------------------------------------
