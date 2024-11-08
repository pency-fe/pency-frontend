import { api } from "_core/api";

type SignupReq = {
  email: string;
  password: string;
  terms: boolean;
  privacy: boolean;
};

type SignupRes = {
  provisionUserId: string;
};

export const signup = async (req: SignupReq) => {
  return await api.post<SignupRes>("auth/signup", { json: req }).json();
};

// ----------------------------------------------------------------------

type EmailReq = {
  provisionUserId: string;
};

type EmailRes = { email: string };

export const email = async (req: EmailReq) => {
  return await api.get<EmailRes>("auth/signup/email", { searchParams: req }).json();
};

// ----------------------------------------------------------------------

type ResendReq = {
  provisionUserId: string;
};

export const resend = async (req: ResendReq) => {
  return await api.post("auth/signup/resend", { searchParams: req }).json();
};

// ----------------------------------------------------------------------

type VerifyReq = { token: string };

export const verify = async (req: VerifyReq) => {
  return await api.post("auth/signup/verify", { searchParams: req }).json();
};
