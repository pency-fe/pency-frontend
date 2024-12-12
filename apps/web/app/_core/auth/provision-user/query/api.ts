import { api } from "_core/api";

type SignupForEmailReq = {
  email: string;
  password: string;
  terms: boolean;
  privacy: boolean;
};

type SignupForEmailRes = {
  id: number;
};

export const signupForEmail = async (req: SignupForEmailReq) => {
  return await api.post<SignupForEmailRes>("auth/signup/email", { json: req }).json();
};

// ----------------------------------------------------------------------

type GetProvisionUserReq = {
  id: number;
};

type GetProvisionUserRes = { email: string };

export const getProvisionUser = async (req: GetProvisionUserReq) => {
  return await api.get<GetProvisionUserRes>(`auth/provision-user/${req.id}`).json();
};

// ----------------------------------------------------------------------

type ResendReq = {
  id: number;
};

export const resend = async (req: ResendReq) => {
  return await api.post(`auth/provision-user/${req.id}/resend`).json();
};

// ----------------------------------------------------------------------

type VerifyReq = { id: number; token: string };

export const verify = async (req: VerifyReq) => {
  return await api
    .post(`auth/provision-user/${req.id}/verify`, {
      json: {
        token: req.token,
      },
    })
    .json();
};
