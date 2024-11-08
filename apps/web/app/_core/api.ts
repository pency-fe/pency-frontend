import ky, { HTTPError } from "ky";

export const api = ky.create({
  credentials: "include",
  prefixUrl: process.env["NEXT_PUBLIC_SERVER_URL"],
  hooks: {
    beforeError: [
      async (error) => {
        const response = await error.response.json<FailureRes<number, string, unknown>>();
        return new QueryError(error, response);
      },
    ],
  },
  retry: 0,
});

export type FailureRes<Status extends number, Code extends string, Data = null> = {
  status: Status;
  code: Code;
  message: string;
  data: Data;
};

export class QueryError<T extends FailureRes<number, string, unknown>> extends HTTPError<T> {
  public code: T["code"];
  public data: T["data"];
  public message: T["message"];

  constructor(httpError: HTTPError<T>, response: T) {
    super(httpError.response, httpError.request, httpError.options);
    this.code = response.code;
    this.data = response.data;
    this.message = response.message;
  }
}
