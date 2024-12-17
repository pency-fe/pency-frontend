"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  ButtonProps,
  InputAdornment,
  inputBaseClasses,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";
import { Controller, FormProvider, SubmitErrorHandler, useController, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { useCreateChannel } from "../query";
import { toast } from "@pency/ui/components";
import { useRouter } from "next/navigation";
import { objectKeys, useToggle } from "@pency/util";
import { getUploadImageUrl } from "_core/common";
import { LoadingButton } from "@mui/lab";
import ky from "ky";

// ----------------------------------------------------------------------

const schema = z.object({
  title: z.string().min(1, "채널 제목을 입력해 주세요.").max(45, "최대 45자 이내로 입력해 주세요."),
  description: z.string().max(200, "최대 200자 이내로 입력해 주세요."),
  url: z
    .string()
    .regex(/^(?!-)[a-z0-9]+(-[a-z0-9]+)*(?<!-)$/, "URL은 영문 소문자, 숫자, 대시(-)만 입력할 수 있어요.")
    .min(6, "최소 6자 이상 입력해 주세요.")
    .max(45, "최대 45자 이내로 입력해 주세요."),
  image: z.string(),
});

type Schema = z.infer<typeof schema>;

// ----------------------------------------------------------------------

const useCHFormContext = () => useFormContext<Schema>();

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
      image: "",
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
      image: "",
    },
    mode: "onTouched",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

// ----------------------------------------------------------------------

type CreateSubmitFnProps = Omit<ButtonProps, "children">;

const CreateSubmitFn = (props: CreateSubmitFnProps) => {
  const router = useRouter();
  const { mutate } = useCreateChannel();

  const { handleSubmit, setError } = useFormContext<Schema>();

  const onSubmit = (data: Schema) => {
    mutate(data, {
      onSuccess: (data) => {
        router.push(`/@${data.url}`);
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

  const onErrorSubmit: SubmitErrorHandler<Schema> = (errors) => {
    const names = objectKeys(errors);
    if (names[0]) {
      document.getElementsByName(names[0])[0]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      onClick={handleSubmit(onSubmit, onErrorSubmit)}
      {...props}
    >
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
      변경 내용 저장
    </Button>
  );
};

// ----------------------------------------------------------------------

type DeleteFnProps = Omit<ButtonProps, "children">;

const DeleteFn = (props: DeleteFnProps) => {
  const { handleSubmit } = useFormContext<Schema>();

  const onSubmit = (data: Schema) => {
    console.log(data);
  };

  return (
    <Button type="submit" variant="text" color="error" onClick={handleSubmit(() => onSubmit)} {...props}>
      채널 삭제
    </Button>
  );
};

// ----------------------------------------------------------------------

type TitleFnProps = TextFieldProps;

const TitleFn = (rest: TitleFnProps) => {
  const { control } = useFormContext<Schema>();

  return (
    <Controller
      control={control}
      name="title"
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          variant="outlined"
          {...rest}
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

type DescriptionFnProps = TextFieldProps;

const DescriptionFn = (rest: DescriptionFnProps) => {
  const { control } = useFormContext<Schema>();

  return (
    <Controller
      control={control}
      name="description"
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          variant="outlined"
          {...rest}
          fullWidth
          multiline
          minRows={2}
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

type UrlFnProps = TextFieldProps;

const UrlFn = (rest: UrlFnProps) => {
  const { control } = useFormContext<Schema>();

  return (
    <Controller
      control={control}
      name="url"
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          variant="outlined"
          {...rest}
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

const ImageFn = () => {
  const theme = useTheme();
  const { control } = useCHFormContext();
  const {
    field: { value, onChange },
  } = useController({ control, name: "image" });
  const [loading, toggleLoading] = useToggle(false);

  const upload = () => {
    const picker = document.createElement("input");
    picker.type = "file";
    picker.accept = ["image/jpeg", "image/png", "image/gif"].join(",");
    picker.multiple = false;
    picker.addEventListener("change", async () => {
      if (picker.files?.[0]) {
        if (picker.files[0].size > 50 * 1024 * 1024) {
          toast.error("최대 50MB 이미지만 업로드할 수 있어요.");
          return;
        }

        toggleLoading(true);
        const res = await getUploadImageUrl({
          contentLength: picker.files[0].size,
          contentType: picker.files[0].type as Parameters<typeof getUploadImageUrl>[0]["contentType"],
        });
        await ky.put(res.signedUploadUrl, { body: picker.files[0] });
        toggleLoading(false);
        onChange(res.url);
        console.log("res.url: ", res.url);
      }
    });
    picker.click();
  };

  const remove = () => {
    onChange("");
  };

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2">채널 프로필 이미지</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            aspectRatio: 1 / 1,
            borderRadius: 1,
            overflow: "hidden",
            width: "128px",
          }}
        >
          <Box
            component="img"
            src={value.length ? value : process.env["NEXT_PUBLIC_LOGO"]}
            sx={{ width: 1, height: 1, objectFit: "cover" }}
          />
        </Box>

        <Stack alignItems="flex-start" gap={0.5}>
          <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 1 }}>
            <LoadingButton variant="soft" color="primary" loading={loading} onClick={upload} sx={{}}>
              업로드
            </LoadingButton>

            {value && (
              <Button variant="soft" color="error" sx={{ mr: 1 }} onClick={remove}>
                삭제
              </Button>
            )}
          </Box>

          <Typography variant="overline" color={theme.vars.palette.text.secondary} mr="auto">
            추천 비율(1:1) / 최대 50MB 이미지 파일
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

// ----------------------------------------------------------------------

export const CH_Create_Form = Object.assign(CH_Create_Form_Fn, {
  Title: TitleFn,
  Description: DescriptionFn,
  Url: UrlFn,
  Image: ImageFn,
  CreateSubmitButton: CreateSubmitFn,
});

export const CH_Update_Form = Object.assign(CH_Update_Form_Fn, {
  Title: TitleFn,
  Description: DescriptionFn,
  Url: UrlFn,
  Image: ImageFn,
  UpdateSubmitButton: UpdateSubmitFn,
  DeleteButton: DeleteFn,
});
