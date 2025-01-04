import { getUploadImageUrl } from "@/entities/channel-me";
import { Genre, GENRE_LABEL, Status, STATUS_LABEL } from "@/shared/config/webtoon/const";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  ButtonProps,
  Chip,
  Grid,
  InputAdornment,
  inputBaseClasses,
  MenuItem,
  RadioGroup,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
  useTheme,
} from "@mui/material";
import { RadioButton, toast } from "@pency/ui/components";
import { objectEntries, useToggle, useToggleStore, zodObjectKeys } from "@pency/util";
import ky from "ky";
import { ChangeEventHandler, KeyboardEventHandler, useMemo, useState } from "react";
import { Controller, FormProvider, useController, useForm, useFormContext } from "react-hook-form";
import { z, ZodError } from "zod";

// ----------------------------------------------------------------------

const keywordSchema = z
  .string()
  .regex(/^[가-힣a-zA-Z0-9_]+$/, "키워드는 한글, 영문, 숫자, 밑줄(_)만 입력할 수 있어요.")
  .max(20, "키워드는 20자 이내로 입력해 주세요.");

const schema = z.object({
  image: z.string(),
  status: z.enum(zodObjectKeys(STATUS_LABEL), { message: "연재 상태를 선택해 주세요." }),
  genre: z.enum(zodObjectKeys(GENRE_LABEL), { message: "장르를 선택해 주세요." }),
  title: z.string().min(1, "제목을 입력해 주세요.").max(40, "최대 40자 이내로 입력해 주세요."),
  description: z.string().max(100, "최대 100자 이내로 입력해 주세요."),
  keywords: z.array(keywordSchema).max(10, "키워드는 최대 10개 이내로 입력해 주세요."),
});

type Schema = z.infer<typeof schema>;

// ----------------------------------------------------------------------

const useWTSeriesFormContext = () => useFormContext<Schema>();

// ----------------------------------------------------------------------

type WTCreateSeriesFormFnProps = {
  children?: React.ReactNode;
};

const WTCreateSeriesFormFn = ({ children }: WTCreateSeriesFormFnProps) => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      image: "",
      status: "SERIAL",
      genre: "" as Genre,
      title: "",
      description: "",
      keywords: [],
    },
    mode: "onTouched",
  });

  const onSubmit = () => {
    console.log("submit");
  };

  const onErrorSubmit = () => {
    console.log("error submit");
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

type WTUpdateSeriesFormFnProps = {
  data: {
    image?: string;
    status: Status;
    genre: Genre;
    title: string;
    description?: string;
    keywords?: string[];
  };
  children?: React.ReactNode;
};

const WTUpdateSeriesFormFn = ({ children, data }: WTUpdateSeriesFormFnProps) => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      image: data.image ?? "",
      status: data.status ?? "SERIAL",
      genre: data.genre ?? ("" as Genre),
      title: data.title ?? "",
      description: data.description ?? "",
      keywords: data.keywords ?? [],
    },
    mode: "onTouched",
  });

  const onSubmit = () => {
    console.log("submit");
  };

  const onErrorSubmit = () => {
    console.log("error submit");
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
  const [loading, toggleLoading] = useToggle(false);

  return (
    <LoadingButton loading={loading} type="submit" variant="contained" color="primary" {...rest}>
      새 시리즈 만들기
    </LoadingButton>
  );
};

// ----------------------------------------------------------------------

type UpdateSubmitFnProps = Omit<ButtonProps, "children">;

const UpdateSubmitFn = (rest: UpdateSubmitFnProps) => {
  const [loading, toggleLoading] = useToggle(false);

  return (
    <LoadingButton loading={loading} type="submit" variant="contained" color="primary" {...rest}>
      변경 내용 저장
    </LoadingButton>
  );
};

// ----------------------------------------------------------------------

const ImageFn = () => {
  const theme = useTheme();
  const { control } = useWTSeriesFormContext();
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
      <Typography variant="subtitle2">시리즈 썸네일 이미지</Typography>
      <Stack sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          component="img"
          src={value.length ? value : process.env["NEXT_PUBLIC_LOGO"]}
          sx={{
            flexShrink: 0,
            width: "260px",
            aspectRatio: 16 / 9,
            borderRadius: 1,
            overflow: "hidden",
            objectFit: "cover",
          }}
        />
        <Stack alignItems="center" gap={0.5}>
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
            추천 비율(16:9) / 최대 10MB 이미지 파일
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

// ----------------------------------------------------------------------

const StatusFn = () => {
  const { control } = useWTSeriesFormContext();
  const entries = useMemo(() => objectEntries(STATUS_LABEL), []);

  return (
    <Controller
      control={control}
      name="status"
      render={({ field }) => (
        <Stack spacing={1}>
          <Typography variant="subtitle2">연재 상태</Typography>
          <RadioGroup {...field}>
            <Grid container spacing={1}>
              {entries.map(([value, label]) => (
                <Grid item key={value}>
                  <RadioButton value={value}>{label}</RadioButton>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </Stack>
      )}
    />
  );
};

// ----------------------------------------------------------------------

const GenreFn = () => {
  const { control } = useWTSeriesFormContext();
  const genreLabels = objectEntries(GENRE_LABEL);

  return (
    <Controller
      control={control}
      name="genre"
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label="장르"
          required
          select
          defaultValue=""
          error={!!error}
          helperText={error ? error.message : ""}
        >
          <MenuItem value="" sx={{ display: "none" }}></MenuItem>
          {genreLabels.map(([value, label]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

// ----------------------------------------------------------------------

type TitleFnProps = TextFieldProps;

const TitleFn = (rest: TitleFnProps) => {
  const { control } = useWTSeriesFormContext();

  return (
    <Controller
      control={control}
      name="title"
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          variant="outlined"
          {...rest}
          label="시리즈 제목"
          type="text"
          required
          helperText={error ? error.message : "최대 40자 이내로 입력해 주세요."}
          error={!!error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Typography variant="caption">{field.value?.length}/40</Typography>
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
  const { control } = useWTSeriesFormContext();

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
          helperText={error ? error.message : "최대 100자 이내로 입력해 주세요."}
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

const KeywordsFn = () => {
  const { control } = useWTSeriesFormContext();
  const {
    field: { value, onChange },
  } = useController({ control, name: "keywords" });

  const [keyword, setKeyword] = useState<string>("");
  const [keywordError, setKeywordError] = useState<ZodError | null>(null);

  const handleFocus = () => {
    if (keyword.length) {
      const parse = keywordSchema.safeParse(keyword);
      if (parse.success) {
        setKeywordError(null);
      } else {
        setKeywordError(parse.error);
      }
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setKeyword(value);

    if (value.length) {
      const parse = keywordSchema.safeParse(value);
      if (parse.success) {
        setKeywordError(null);
      } else {
        setKeywordError(parse.error);
      }
    } else {
      setKeywordError(null);
    }
  };

  const handleBlur = () => {
    if (keywordError) {
      setKeywordError(null);
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      if (event.keyCode === 229 || keywordError || keyword.length === 0) {
        return;
      }
      if (value.length >= 10) {
        toast.error("키워드는 최대 10개 이내로 입력해 주세요.");
        return;
      }
      if (value.includes(keyword)) {
        toast.error("이미 입력한 키워드예요.");
        return;
      }

      const newKeywords = [...value];
      newKeywords.push(keyword);
      onChange(newKeywords);
      setKeyword("");
      return;
    }

    if (event.key === "Backspace") {
      if (keyword.length === 0) {
        const newKeywords = [...value];
        newKeywords.pop();
        onChange(newKeywords);
        return;
      }
    }
  };

  const deleteKeyword = (keyword: string) => {
    const index = value.indexOf(keyword);
    if (index !== -1) {
      const newKeywords = [...value];
      newKeywords.splice(index, 1);
      onChange(newKeywords);
    }
  };

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2">키워드</Typography>
      <TextField
        variant="outlined"
        fullWidth
        value={keyword}
        error={!!keywordError}
        helperText={
          keywordError
            ? keywordError.errors[0]?.message
            : "각 20자 이하로 10개까지 입력할 수 있어요. 한글, 영문, 숫자, 밑줄(_)만 입력할 수 있어요."
        }
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: value.map((keyword, i) => (
            <Chip
              key={i}
              variant="soft"
              color="info"
              label={keyword}
              onDelete={() => deleteKeyword(keyword)}
              sx={{ margin: "3px" }}
            />
          )),
        }}
        sx={{
          [`& .${inputBaseClasses.root}`]: {
            flexWrap: "wrap",
            padding: "9px",
          },
          [`& .${inputBaseClasses.input}`]: {
            flexGrow: 1,
            width: 0,
            minWidth: "30px",
            padding: "7.5px 4px 7.5px 5px",
          },
        }}
      />
    </Stack>
  );
};

// ----------------------------------------------------------------------

export const WTSeriesForm = Object.assign(WTCreateSeriesFormFn, {
  Image: ImageFn,
  Status: StatusFn,
  Genre: GenreFn,
  title: TitleFn,
  description: DescriptionFn,
  keywords: KeywordsFn,
  CreateSubmit: CreateSubmitFn,
});
