import { api } from "_core/api";

/** **************************************
 * provision-user
 *************************************** */

// ----------------------------------------------------------------------

type SignupWithEmailReq = {
  email: string;
  password: string;
  terms: boolean;
  privacy: boolean;
};

type SignupWithEmailRes = {
  id: number;
};

export const signupWithEmail = async (req: SignupWithEmailReq) => {
  return await api.post<SignupWithEmailRes>("provision-user", { json: req }).json();
};

// ----------------------------------------------------------------------

type GetProvisionUserReq = {
  id: number;
};

type GetProvisionUserRes = { email: string };

export const getProvisionUser = async (req: GetProvisionUserReq) => {
  return await api.get<GetProvisionUserRes>(`provision-user/${req.id}`).json();
};

// ----------------------------------------------------------------------

type ResendEmailReq = {
  id: number;
};

export const resendEmail = async (req: ResendEmailReq) => {
  return await api.post(`provision-user/${req.id}/resend`).json();
};

// ----------------------------------------------------------------------

type VerifyEmailReq = { id: number; token: string };

export const verifyEmail = async (req: VerifyEmailReq) => {
  return await api
    .post(`provision-user/${req.id}/verify`, {
      json: {
        token: req.token,
      },
    })
    .json();
};
