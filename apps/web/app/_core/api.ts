import ky from "ky";

export const api = ky.create({
  credentials: "include",
  prefixUrl: process.env["NEXT_PUBLIC_SERVER_URL"],
});

export type SuccessRes<Data = null> = {
  status: 200;
  code: "SUCCESS";
  data: Data;
};

export type FailureRes<Status extends number, Code extends string, Data = null> = {
  status: Status;
  code: Code;
  message: string;
  data: Data;
};
