import { AGE_LABEL } from "@/shared/config/webtoon/const";
import { zodObjectKeys } from "@pency/util";
import { z } from "zod";
import { keywordSchema } from "./keyword-schema";

export const formSchema = z
  .object({
    title: z.string().min(1, "제목을 입력해 주세요.").max(100, "최대 100자 이내로 입력해 주세요."),
    price: z.coerce.number(),
    content: z
      .object({
        free: z.array(z.object({ name: z.string(), src: z.string().url() })),
        paid: z.array(z.object({ name: z.string(), src: z.string().url() })),
      })
      .superRefine(({ free, paid }, ctx) => {
        if (free.length + paid.length === 0) {
          ctx.addIssue({
            code: "custom",
            message: "원고를 작성해 주세요.",
            fatal: true,
          });
          return z.NEVER;
        }
      })
      .superRefine(({ free, paid }, ctx) => {
        if (free.length + paid.length > 100) {
          ctx.addIssue({
            code: "custom",
            message: "최대 100장까지 작성할 수 있어요.",
            fatal: true,
          });
          return z.NEVER;
        }
      }),
    thumbnail: z.string(),
    age: z.enum(zodObjectKeys(AGE_LABEL)),
    keywords: z.array(keywordSchema).max(10, "키워드는 최대 10개 이내로 입력해 주세요."),
    authorTalk: z.string().max(200, "작가의 말은 200자 이내로 입력해 주세요."),
    precaution: z.string().max(200, "읽기전 주의 사항은 200자 이내로 입력해 주세요."),
  })
  .superRefine(({ content: { paid }, price }, ctx) => {
    if (paid.length) {
      if (price < 100) {
        ctx.addIssue({ code: "custom", message: "최소 100포인트부터 설정 가능해요.", path: ["price"] });
        return;
      }
      if (price > 500000) {
        ctx.addIssue({ code: "custom", message: "최대 500,000포인트까지 설정 가능해요.", path: ["price"] });
        return;
      }
      if (price % 100 !== 0) {
        ctx.addIssue({ code: "custom", message: "포인트는 100P 단위로 설정해 주세요.", path: ["price"] });
        return;
      }
    }
  });

export type FormSchema = z.infer<typeof formSchema>;
