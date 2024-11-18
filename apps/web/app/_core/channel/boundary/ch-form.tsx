"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ButtonProps, InputAdornment, inputBaseClasses, TextField, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { useChannelCreate } from "../query";
import { toast } from "@pency/ui/components";
import { useRouter } from "next/navigation";

// ----------------------------------------------------------------------

const schema = z.object({
  title: z.string().min(1, "채널 제목을 입력해 주세요.").max(45, "최대 45자 이내로 입력해 주세요."),
  description: z.string().max(200, "최대 200자 이내로 입력해 주세요.").optional(),
  url: z
    .string()
    .regex(/^(?!-)[a-z0-9]+(-[a-z0-9]+)*(?<!-)$/, "URL은 영문 소문자, 숫자, 대시(-)만 입력할 수 있어요.")
    .min(6, "최소 6자 이상 입력해 주세요.")
    .max(45, "최대 45자 이내로 입력해 주세요."),
});

type Schema = z.infer<typeof schema>;

// ----------------------------------------------------------------------

type CH_Create_Form_Fn_Props = {
  children?: ReactNode;
};

const CH_Create_Form_Fn = ({ children }: CH_Create_Form_Fn_Props) => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
    },
    mode: "onTouched",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

// ----------------------------------------------------------------------

type CH_Update_Form_Fn_Props = {
  children?: ReactNode;
};

const CH_Update_Form_Fn = ({ children }: CH_Update_Form_Fn_Props) => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
    },
    mode: "onTouched",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

// ----------------------------------------------------------------------

type CreateSubmitFnProps = Omit<ButtonProps, "children">;

const CreateSubmitFn = (props: CreateSubmitFnProps) => {
  const router = useRouter();
  const { mutate } = useChannelCreate();

  const { handleSubmit, setError } = useFormContext<Schema>();

  const onSubmit = (data: Schema) => {
    mutate(data, {
      onSuccess: (data) => {
        router.push(`/@${data.url}`);
        toast.success("새 채널을 만들었어요.");
      },
      onError: async (error) => {
        if (error.code === "DUPLICATE_URL") {
          setError("url", {
            message: "중복된 URL이에요.",
          });
        }
      },
    });
  };

  return (
    <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)} {...props}>
      새 채널 만들기
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
      채널 수정하기
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
          type="text"
          label="채널 제목"
          required
          helperText={error ? error.message : "최대 45자 이내로 입력해 주세요."}
          error={!!error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Typography variant="caption">{field.value?.length}/45</Typography>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

// ----------------------------------------------------------------------

const DescriptionFn = () => {
  const { control } = useFormContext<Schema>();

  return (
    <Controller
      control={control}
      name="description"
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          variant="outlined"
          fullWidth
          multiline
          minRows={5}
          maxRows={7}
          type="text"
          label="채널 설명"
          helperText={error ? error.message : "최대 200자 이내로 입력해 주세요."}
          error={!!error}
          sx={{
            [`& .${inputBaseClasses.root}`]: {
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ alignSelf: "flex-end" }}>
                <Typography variant="caption">{field.value?.length}/200</Typography>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

// ----------------------------------------------------------------------

const UrlFn = () => {
  const { control } = useFormContext<Schema>();

  return (
    <Controller
      control={control}
      name="url"
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          variant="outlined"
          fullWidth
          type="text"
          label="채널 URL"
          required
          helperText={error ? error.message : "최대 45자 이내로 입력해 주세요."}
          error={!!error}
          InputProps={{
            startAdornment: <InputAdornment position="start">pency.kr/@</InputAdornment>,
            endAdornment: (
              <InputAdornment position="end">
                <Typography variant="caption">{field.value?.length}/45</Typography>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

// ----------------------------------------------------------------------

export const CH_Create_Form = Object.assign(CH_Create_Form_Fn, {
  Title: TitleFn,
  Description: DescriptionFn,
  Url: UrlFn,
  CreateSubmitButton: CreateSubmitFn,
});

export const CH_Update_Form = Object.assign(CH_Update_Form_Fn, {
  Title: TitleFn,
  Description: DescriptionFn,
  Url: UrlFn,
  UpdateSubmitButton: UpdateSubmitFn,
});
