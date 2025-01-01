// ----------------------------------------------------------------------

import { apiClient } from "@/shared/lib/ky/api-client";

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
  return await apiClient.post<SignupWithEmailRes>("provision-user", { json: req }).json();
};

// ----------------------------------------------------------------------

type ResendEmailReq = {
  id: number;
};

export const resendEmail = async (req: ResendEmailReq) => {
  return await apiClient.post(`provision-user/${req.id}/resend`).json();
};

// ----------------------------------------------------------------------

type VerifyEmailReq = { id: number; token: string };

export const verifyEmail = async (req: VerifyEmailReq) => {
  return await apiClient
    .post(`provision-user/${req.id}/verify`, {
      json: {
        token: req.token,
      },
    })
    .json();
};
