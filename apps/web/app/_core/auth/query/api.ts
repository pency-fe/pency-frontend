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

// ----------------------------------------------------------------------

type EmailReq = {
  provisionUserId: string;
};

type EmailRes = SuccessRes<{ email: string }>;

export const email = async (req: EmailReq) => {
  return await api.get<EmailRes>("auth/signup/email", { searchParams: req.provisionUserId }).json();
};

// ----------------------------------------------------------------------

type ResendReq = {
  provisionUserId: string;
};

type ResendRes = SuccessRes;

export const resend = async (req: ResendReq) => {
  return await api.post<ResendRes>("auth/signup/resend", { searchParams: req.provisionUserId }).json();
};

// ----------------------------------------------------------------------

type VerifyReq = { token: string };

type VerifyRes = SuccessRes;

export const verify = async (req: VerifyReq) => {
  return await api.post<VerifyRes>("auth/signup/verify", { searchParams: req.token }).json();
};

// ----------------------------------------------------------------------

type LoginReq = {
  email: string;
  password: string;
};

type LoginRes = SuccessRes;

export const login = async (req: LoginReq) => {
  return await api.post<LoginRes>("auth/login", { json: req }).json();
};

// ----------------------------------------------------------------------

type LogoutRes = SuccessRes;

export const logout = async () => {
  return await api.post<LogoutRes>("auth/logout").json();
};

// ----------------------------------------------------------------------
