"use client";

import { z } from "zod";
import { AGE_LABEL, CREATION_TYPE_LABEL, PAIR_LABEL } from "../const";
import { GENRE_LABEL } from "_core/webtoon/const";
import { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { Button, ButtonProps, InputAdornment, RadioGroup, TextField, Typography } from "@mui/material";
import { RadioMenuItem } from "@pency/ui/components";
import { objectKeys } from "@pency/util";

// ----------------------------------------------------------------------
function keyArray(entries: [string, string][]) {
  const keys: string[] = [];
  Array.from(entries, ([key, _]) => keys.push(key));
  return keys as unknown as [string, ...string[]];
}

function valueArray(entries: [string, string][]) {
  const values: string[] = [];
  Array.from(entries, ([_, value]) => values.push(value));
  return values as unknown as [string, ...string[]];
}

const creationTypeEntries = Object.entries(CREATION_TYPE_LABEL);

const pairEntries = Object.entries(PAIR_LABEL);

const genreEntries = Object.entries(GENRE_LABEL);

const ageEntries = Object.entries(AGE_LABEL);

// ----------------------------------------------------------------------

const schema = z.object({
  title: z.string().min(1, "제목을 입력해 주세요.").max(100, "제목은 100자 이내로 입력해 주세요."),
  creationType: z.enum(objectKeys(CREATION_TYPE_LABEL)),
  pair: z.enum(keyArray(pairEntries)),
  genre: z.enum(["", ...keyArray(genreEntries)]).refine((value) => value !== "", {
    message: "장르를 선택해야 합니다.",
  }),
  age: z.enum(keyArray(ageEntries)),
  keywords: z.array(z.string()).max(10, "키워드는 최대 10개 이내로 입력해 주세요.").optional(),
  keyword: z
    .string()
    .regex(/^[가-힣a-zA-Z0-9_]+$/, "키워드는 한글, 영문, 숫자, 밑줄(_)만 입력할 수 있어요.")
    .max(20, "키워드는 20자 이내로 입력해 주세요.")
    .optional(),
  authorTalk: z.string().max(200, "작가의 말은 200자 이내로 입력해 주세요.").optional(),
  precautions: z.string().max(200, "읽기전 주의 사항은 200자 이내로 입력해 주세요.").optional(),
  series: z.string().optional(),
});

type Schema = z.infer<typeof schema>;

// ----------------------------------------------------------------------

type WT_Post_Create_Form_Fn_Props = {
  children?: ReactNode;
};

const WT_Post_Create_Form_Fn = ({ children }: WT_Post_Create_Form_Fn_Props) => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      creationType: "",
      pair: "NONE",
      genre: undefined,
      age: "ALL",
      keywords: [],
      keyword: "",
      authorTalk: "",
      precautions: "",
      series: "",
    },
    mode: "onTouched",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

// ----------------------------------------------------------------------

type WT_Post_Update_Form_Fn_Props = {
  children?: ReactNode;
};

const WT_Post_Update_Form_Fn = ({ children }: WT_Post_Update_Form_Fn_Props) => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      creationType: "PRIMARY",
      pair: "NONE",
      genre: undefined,
      age: "ALL",
      keywords: [],
      keyword: "",
      authorTalk: "",
      precautions: "",
      series: "",
    },
    mode: "onTouched",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

// ----------------------------------------------------------------------

type CreateSubmitFnProps = Omit<ButtonProps, "children">;

const CreateSubmitFn = (props: CreateSubmitFnProps) => {
  // const router = useRouter();
  // const { mutate } = usePostCreate();

  const {
    handleSubmit,
    //  setError
  } = useFormContext<Schema>();

  const onSubmit = (data: Schema) => {
    console.log("data: ", data);
  };

  return (
    <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)} {...props}>
      발행
    </Button>
  );
};

// ----------------------------------------------------------------------

type UpdateSubmitFnProps = Omit<ButtonProps, "children">;

const UpdateSubmitFn = (props: UpdateSubmitFnProps) => {
  const { handleSubmit } = useFormContext<Schema>();

  const onSubmit = (data: Schema) => {
    console.log(data);
  };

  return (
    <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(() => onSubmit)} {...props}>
      발행
    </Button>
  );
};

// ----------------------------------------------------------------------

const TitleFn = () => {
  const { control } = useFormContext<Schema>();

  return (
    <Controller
      control={control}
      name="title"
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          variant="outlined"
          fullWidth
          type="text"
          label="채널 제목"
          required
          helperText={error ? error.message : "최대 100자 이내로 입력해 주세요."}
          error={!!error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Typography variant="caption">{field.value?.length}/100</Typography>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

// ----------------------------------------------------------------------

const CreationType = () => {
  const { control } = useFormContext<Schema>();

  return (
    <Controller
      control={control}
      name="creationType"
      render={({ field, fieldState: { error } }) => (
        <RadioGroup {...field}>
          {creationTypeEntries.map(([key, value]) => (
            <RadioMenuItem key={key} value={key}>
              {value}
            </RadioMenuItem>
          ))}
        </RadioGroup>
      )}
    />
  );
};

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
export const WT_Post_Create_Form = Object.assign(WT_Post_Create_Form_Fn, {
  Title: TitleFn,
  CreateSubmitButton: CreateSubmitFn,
});

// ----------------------------------------------------------------------

export const WT_Post_Update_Form = Object.assign(WT_Post_Update_Form_Fn, {
  Title: TitleFn,
  UpdateSubmitButton: UpdateSubmitFn,
});
