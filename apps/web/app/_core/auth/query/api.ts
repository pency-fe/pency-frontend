import { api, SuccessRes } from "_core/api";

type SignupReq = {
  email: string;
  password: string;
  terms: boolean;
  privacy: boolean;
};

type SignupRes = SuccessRes<{
  provisionUserId: string;
}>;

export const signup = async (req: SignupReq) => {
  return await api.post<SignupRes>("auth/signup", { json: req }).json();
};
