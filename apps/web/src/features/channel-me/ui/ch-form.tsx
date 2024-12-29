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
import { toast } from "@pency/ui/components";
import { useRouter } from "next/navigation";
import { objectKeys, useToggle } from "@pency/util";
import { LoadingButton } from "@mui/lab";
import ky from "ky";
import { useCreateChannel } from "../model/use-create-channel";
import { useUpdateBranding } from "../model/use-update-branding";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";
import { BooleanStoreProvider, useBooleanStore } from "@/shared/model/providers/boolean-store-provider";
import { getUploadBgImageUrl, getUploadImageUrl } from "@/entities/channel-me";

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
  bgImage: z.string(),
});

type Schema = z.infer<typeof schema>;

// ----------------------------------------------------------------------

const useChFormContext = () => useFormContext<Schema>();

// ----------------------------------------------------------------------

type ChCreateFormFnProps = {
  children?: ReactNode;
};

const ChCreateFormFn = ({ children }: ChCreateFormFnProps) => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
      image: "",
      bgImage: "",
    },
    mode: "onTouched",
  });
  const { mutate } = useCreateChannel();
  const router = useRouter();
  const toggleLoading = useBooleanStore((s) => s.toggle);

  const onSubmit = (data: Schema) => {
    toggleLoading(true);
    mutate(data, {
      onSuccess: (data) => {
        router.push(`/@${data.url}`);
      },
      onError: (error) => {
        if (error.code === "DUPLICATE_URL") {
          methods.setError("url", {
            message: "중복된 URL이에요.",
          });
          document.getElementsByName("url")[0]?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      },
      onSettled: () => toggleLoading(false),
    });
  };

  const onErrorSubmit: SubmitErrorHandler<Schema> = (errors) => {
    const names = objectKeys(errors);
    if (names[0]) {
      document.getElementsByName(names[0])[0]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(onSubmit, onErrorSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

// ----------------------------------------------------------------------

type ChUpdateFormFnProps = {
  data: {
    title: string;
    description?: string | null;
    url: string;
    image?: string | null;
    bgImage?: string | null;
  };
  originChannelUrl: string;
  children?: ReactNode;
};

const ChUpdateFormFn = ({ data, originChannelUrl, children }: ChUpdateFormFnProps) => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: data.title,
      description: data.description ?? "",
      url: data.url,
      image: data.image ?? "",
      bgImage: data.bgImage ?? "",
    },
    mode: "onTouched",
  });
  const { mutate } = useUpdateBranding();
  const router = useRouter();
  const toggleLoading = useBooleanStore((s) => s.toggle);

  const onSubmit = (data: Schema) => {
    toggleLoading(true);
    mutate(
      { ...data, originChannelUrl },
      {
        onSuccess: (data) => {
          if (formatChannelUrl(data.url) !== formatChannelUrl(originChannelUrl)) {
            router.replace(`/studio/@${data.url}/setting/branding`);
          }
          toast.success("변경 내용을 저장했어요.", {
            id: "ch-form-update-submit-success",
            closeButton: false,
            action: (
              <Box>
                <Button
                  color="success"
                  size="small"
                  onClick={() => {
                    router.push(`/@${data.url}`);
                    toast.dismiss("ch-form-update-submit-success");
                  }}
                >
                  채널로 이동
                </Button>
                <Button size="small" onClick={() => toast.dismiss("ch-form-update-submit-success")}>
                  취소
                </Button>
              </Box>
            ),
          });
        },
        onError: (error) => {
          if (error.code === "DUPLICATE_URL") {
            methods.setError("url", {
              message: "중복된 URL이에요.",
            });
            document.getElementsByName("url")[0]?.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        },
        onSettled: () => toggleLoading(false),
      },
    );
  };

  const onErrorSubmit: SubmitErrorHandler<Schema> = (errors) => {
    const names = objectKeys(errors);
    if (names[0]) {
      document.getElementsByName(names[0])[0]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(onSubmit, onErrorSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

// ----------------------------------------------------------------------

type CreateSubmitFnProps = Omit<ButtonProps, "children">;

const CreateSubmitFn = (rest: CreateSubmitFnProps) => {
  const loading = useBooleanStore((s) => s.bool);

  return (
    <LoadingButton loading={loading} type="submit" variant="contained" color="primary" {...rest}>
      새 채널 만들기
    </LoadingButton>
  );
};

// ----------------------------------------------------------------------

type UpdateSubmitFnProps = Omit<ButtonProps, "children">;

const UpdateSubmitFn = (rest: UpdateSubmitFnProps) => {
  const loading = useBooleanStore((s) => s.bool);

  return (
    <LoadingButton loading={loading} type="submit" variant="contained" color="primary" {...rest}>
      변경 내용 저장
    </LoadingButton>
  );
};

// ----------------------------------------------------------------------

type DeleteFnProps = Omit<ButtonProps, "children">;

const DeleteFn = (props: DeleteFnProps) => {
  const { handleSubmit } = useChFormContext();

  // [TODO]
  const onSubmit = (data: Schema) => {
    console.log(data);
  };

  return (
    <Button variant="text" color="error" onClick={handleSubmit(() => onSubmit)} {...props}>
      채널 삭제
    </Button>
  );
};

// ----------------------------------------------------------------------

type TitleFnProps = TextFieldProps;

const TitleFn = (rest: TitleFnProps) => {
  const { control } = useChFormContext();

  return (
    <Controller
      control={control}
      name="title"
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          variant="outlined"
          {...rest}
          label="채널 제목"
          type="text"
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
  const { control } = useChFormContext();

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
  const { control } = useChFormContext();

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
            startAdornment: <InputAdornment position="start">pency.co.kr/@</InputAdornment>,
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
  const { control } = useChFormContext();
  const {
    field: { value, onChange },
  } = useController({ control, name: "image" });
  const [loading, toggleLoading] = useToggle(false);

  const upload = () => {
    const picker = document.createElement("input");
    picker.type = "file";
    picker.accept = ["image/jpeg", "image/png"].join(",");
    picker.multiple = false;
    picker.addEventListener("change", async () => {
      if (picker.files?.[0]) {
        if (picker.files[0].size > 10 * 1024 * 1024) {
          toast.error("최대 10MB 이미지만 업로드할 수 있어요.");
          return;
        }

        toggleLoading(true);
        const res = await getUploadImageUrl({
          contentLength: picker.files[0].size,
          contentType: picker.files[0].type as Parameters<typeof getUploadImageUrl>[0]["contentType"],
        });
        await ky.put(res.signedUploadUrl, { body: picker.files[0] });
        onChange(res.url);
        toggleLoading(false);
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
            <LoadingButton variant="soft" color="primary" loading={loading} onClick={upload}>
              업로드
            </LoadingButton>

            {value && (
              <Button variant="soft" color="error" sx={{ mr: 1 }} onClick={remove}>
                삭제
              </Button>
            )}
          </Box>

          <Typography variant="overline" color={theme.vars.palette.text.secondary} mr="auto">
            추천 비율(1:1) / 최대 10MB 이미지 파일
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

const BgImageFn = () => {
  const { control } = useChFormContext();
  const {
    field: { value, onChange },
  } = useController({ control, name: "bgImage" });

  const [loading, toggleLoading] = useToggle(false);
  const theme = useTheme();

  const upload = () => {
    const picker = document.createElement("input");
    picker.type = "file";
    picker.accept = ["image/jpeg", "image/png"].join(",");
    picker.multiple = false;
    picker.addEventListener("change", async () => {
      if (picker.files?.[0]) {
        const file = picker.files[0];
        if (file.size > 10 * 1024 * 1024) {
          toast.error("최대 10MB 이미지만 업로드할 수 있어요.");
          return;
        }

        toggleLoading(true);
        const img = new Image();
        img.onload = async () => {
          if (img.width < 1536 || img.height < 384) {
            toast.error("1536x384 이상의 배경 이미지를 업로드 해주세요.");
            toggleLoading(false);
            return;
          }

          const res = await getUploadBgImageUrl({
            contentLength: file.size,
            contentType: file.type as Parameters<typeof getUploadBgImageUrl>[0]["contentType"],
          });
          await ky.put(res.signedUploadUrl, { body: file });
          onChange(res.url);
          toggleLoading(false);
        };
        img.onerror = () => {
          toast.error("배경 이미지 파일을 읽는 데 실패했어요.");
          toggleLoading(false);
        };
        img.src = URL.createObjectURL(file);
      }
    });
    picker.click();
  };

  const remove = () => {
    onChange("");
  };

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2">채널 배경 이미지</Typography>
      {value ? (
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 1.5,
            pt: "16.2%",
          }}
        >
          <Box
            component="img"
            src={value}
            sx={{ position: "absolute", left: 0, top: 0, width: 1, height: 1, objectFit: "cover" }}
          />
        </Box>
      ) : null}

      <Stack sx={{ gap: 0.5, alignItems: "flex-start" }}>
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 1 }}>
          <LoadingButton variant="soft" color="primary" loading={loading} onClick={upload}>
            업로드
          </LoadingButton>
          {value ? (
            <Button variant="soft" color="error" sx={{ mr: 1 }} onClick={remove}>
              삭제
            </Button>
          ) : null}
        </Box>
        <Typography variant="overline" color={theme.vars.palette.text.secondary} mr="auto">
          최소 1536x384 픽셀 이상, 최대 10MB의 이미지 파일을 올려주세요. 2560x384 픽셀의 이미지를 올리면 모든 기기에서
          알맞게 표시돼요.
        </Typography>
      </Stack>
    </Stack>
  );
};

// ----------------------------------------------------------------------

export const ChCreateForm = Object.assign(
  (props: ChCreateFormFnProps) => (
    <BooleanStoreProvider>
      <ChCreateFormFn {...props} />
    </BooleanStoreProvider>
  ),
  {
    Title: TitleFn,
    Description: DescriptionFn,
    Url: UrlFn,
    Image: ImageFn,
    BgImage: BgImageFn,
    CreateSubmitButton: CreateSubmitFn,
  },
);

export const ChUpdateForm = Object.assign(
  (props: ChUpdateFormFnProps) => (
    <BooleanStoreProvider>
      <ChUpdateFormFn {...props} />
    </BooleanStoreProvider>
  ),
  {
    Title: TitleFn,
    Description: DescriptionFn,
    Url: UrlFn,
    Image: ImageFn,
    BgImage: BgImageFn,
    UpdateSubmitButton: UpdateSubmitFn,
    DeleteButton: DeleteFn,
  },
);
