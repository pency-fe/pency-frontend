import ky from "ky";

export const api = ky.create({
  prefixUrl: "http://localhost:8080",
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
