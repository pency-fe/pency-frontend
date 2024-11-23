"use client";

import { z } from "zod";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import {
  Autocomplete,
  Box,
  Button,
  ButtonProps,
  Grid,
  InputAdornment,
  inputBaseClasses,
  MenuItem,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactNode, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AGE_LABEL, CREATION_TYPE_LABEL, PAIR_LABEL } from "../../const";
import { GENRE_LABEL } from "_core/webtoon/const";
import { objectEntries, zodObjectKeys } from "@pency/util";
import { BrandPencyTextIcon, RadioButton } from "@pency/ui/components";
import { Editor } from "./editor";
import { varAlpha } from "@pency/ui/util";

// ----------------------------------------------------------------------

const schema = z.object({
  title: z.string().min(1, "제목을 입력해 주세요.").max(100, "제목은 100자 이내로 입력해 주세요."),
  genre: z.string().refine((value) => Object.keys(GENRE_LABEL).includes(value), { message: "장르를 선택해 주세요." }),
  content: z
    .object({
      free: z.array(z.object({ name: z.string(), src: z.string().url() })),
      paid: z.array(z.object({ name: z.string(), src: z.string().url() })),
    })
    .refine(({ free, paid }) => free.length + paid.length >= 1 && free.length + paid.length <= 100),
  thumbnail: z.string().optional(),
  creationType: z.enum(zodObjectKeys(CREATION_TYPE_LABEL)),
  pair: z.enum(zodObjectKeys(PAIR_LABEL)),
  age: z.enum(zodObjectKeys(AGE_LABEL)),
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

export const useWTPostFormContext = () => useFormContext<Schema>();

// ----------------------------------------------------------------------

type WT_Post_Create_Form_Fn_Props = {
  children?: ReactNode;
};

const WT_Post_Create_Form_Fn = ({ children }: WT_Post_Create_Form_Fn_Props) => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      genre: "",
      content: {
        free: [
          // { name: "1번하이하이하이하이하이.jpg", src: "https://glyph.pub/images/24/02/v/v8/v8nl9bz93rbol9lf.jpg" },
          // { name: "2번.jpg", src: "https://glyph.pub/images/24/02/u/u3/u3603si0i06hows9.jpg" },
        ],
        paid: [
          // { name: "3번.jpg", src: "https://glyph.pub/images/24/02/e/eb/ebo089j0ujdxb85t.jpg" },
          // { name: "4번.jpg", src: "https://glyph.pub/images/24/02/o/ov/ovwj6mtqbdxv5lsz.jpg" },
          // { name: "5번.jpg", src: "https://glyph.pub/images/24/02/o/o0/o0joo5zvmlzov04b.jpg" },
          // { name: "6번.jpg", src: "https://glyph.pub/images/24/02/u/u6/u6r4flbjqib4q3or.jpg" },
          // { name: "7번.jpg", src: "https://glyph.pub/images/24/02/y/yt/yt20v00uufyhrwcx.jpg" },
        ],
      },
      thumbnail: "",
      creationType: "PRIMARY",
      pair: "NONE",
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
      genre: "",
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
  } = useWTPostFormContext();

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
  const { handleSubmit } = useWTPostFormContext();

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
  const { control } = useWTPostFormContext();

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
          label="포스트 제목"
          required
          helperText={error ? error.message : "최대 100자 아내로 입력해 주세요."}
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

const CreationTypeFn = () => {
  const { control } = useWTPostFormContext();
  const entries = useMemo(() => objectEntries(CREATION_TYPE_LABEL), []);

  return (
    <Controller
      control={control}
      name="creationType"
      render={({ field }) => (
        <Stack spacing={1}>
          <Typography variant="subtitle2">창작 유형</Typography>
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

const PairFn = () => {
  const { control } = useWTPostFormContext();
  const entries = objectEntries(PAIR_LABEL);

  return (
    <Controller
      control={control}
      name="pair"
      render={({ field }) => (
        <Stack spacing={1}>
          <Typography variant="subtitle2">페어</Typography>
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
  const { control } = useWTPostFormContext();
  const entries = objectEntries(GENRE_LABEL);

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
          {entries.map(([value, label]) => (
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

const KeywordsFn = () => {
  const { control } = useWTPostFormContext();
  return (
    <Controller
      control={control}
      name="keywords"
      render={({ field }) => (
        <Stack spacing={1}>
          <Typography variant="subtitle2">키워드</Typography>
          <Autocomplete options={[]} renderInput={(params) => <TextField {...params} variant="outlined" />} />
        </Stack>
      )}
    />
  );
};

// ----------------------------------------------------------------------

const KeywordFn = () => {
  return <Typography variant="subtitle2">키워드</Typography>;
};

// ----------------------------------------------------------------------

const AgeFn = () => {
  const { control } = useWTPostFormContext();
  const entries = objectEntries(AGE_LABEL);

  return (
    <Controller
      control={control}
      name="age"
      render={({ field }) => (
        <Stack spacing={1}>
          <Typography variant="subtitle2">연령</Typography>
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

const AuthorTalkFn = () => {
  const { control } = useWTPostFormContext();

  return (
    <Controller
      control={control}
      name="authorTalk"
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          variant="filled"
          fullWidth
          multiline
          maxRows={5}
          type="text"
          label="작가의 말"
          helperText={error ? error.message : "최대 200자 아내로 입력해 주세요."}
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
              <InputAdornment position="end" sx={{ alignSelf: "flex-end", mb: 1 }}>
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

const PrecautionsFn = () => {
  const { control } = useWTPostFormContext();

  return (
    <Controller
      control={control}
      name="precautions"
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          variant="filled"
          fullWidth
          multiline
          maxRows={5}
          type="text"
          label="읽기 전 주의사항"
          helperText={error ? error.message : "최대 200자 아내로 입력해 주세요."}
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
              <InputAdornment position="end" sx={{ alignSelf: "flex-end", mb: 1 }}>
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

const SeriesFn = () => {
  return <Typography variant="subtitle2">시리즈</Typography>;
};

// ----------------------------------------------------------------------

const MIMES = ["image/jpeg", "image/png", "image/gif"];

const ThumbnailFn = () => {
  const theme = useTheme();
  const { watch, setValue } = useWTPostFormContext();
  const thumbnail = watch("thumbnail");

  const upload = () => {
    const picker = document.createElement("input");
    picker.type = "file";
    picker.accept = MIMES.join(",");
    picker.multiple = false;
    picker.addEventListener("change", () => {
      if (picker.files?.[0]) {
        const src = URL.createObjectURL(picker.files[0]);
        setValue("thumbnail", src);
      }
    });
    picker.click();
  };

  const remove = () => {
    setValue("thumbnail", "");
  };

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2">썸네일</Typography>
      <Stack spacing={1}>
        <Box
          sx={{
            aspectRatio: 16 / 9,
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          {thumbnail ? (
            <Box component="img" src={thumbnail} sx={{ width: 1, height: 1, objectFit: "cover" }} />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 1,
                height: 1,
                bgcolor: varAlpha(theme.vars.palette.grey["500Channel"], 0.16),
              }}
            >
              <BrandPencyTextIcon sx={{ width: "25%", height: "auto" }} />
            </Box>
          )}
        </Box>
        <Stack direction="row" alignItems="center">
          <Typography variant="overline" color={theme.vars.palette.text.secondary} mr="auto">
            추천 비율(16:9) / 최대 50MB의 이미지 파일
          </Typography>
          {thumbnail && (
            <Button variant="text" sx={{ mr: 1 }} onClick={remove}>
              삭제
            </Button>
          )}

          {/* 썸네일 업로드 후, "변경"으로 라벨 변경 */}
          <Button variant="soft" color="primary" onClick={upload}>
            업로드
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

// ----------------------------------------------------------------------

export const WT_Post_Create_Form = Object.assign(WT_Post_Create_Form_Fn, {
  CreateSubmitButton: CreateSubmitFn,
  Title: TitleFn,
  Genre: GenreFn,
  Editor: Editor,
  CreationType: CreationTypeFn,
  Pair: PairFn,
  Age: AgeFn,
  Keywords: KeywordsFn,
  Keyword: KeywordFn,
  AuthorTalk: AuthorTalkFn,
  Precautions: PrecautionsFn,
  Series: SeriesFn,
  Thumbnail: ThumbnailFn,
  useWTPostFormContext,
});

// ----------------------------------------------------------------------

export const WT_Post_Update_Form = Object.assign(WT_Post_Update_Form_Fn, {
  UpdateSubmitButton: UpdateSubmitFn,
  Title: TitleFn,
  Genre: GenreFn,
  Editor: Editor,
  CreationType: CreationTypeFn,
  Pair: PairFn,
  Age: AgeFn,
  Keywords: KeywordsFn,
  Keyword: KeywordFn,
  AuthorTalk: AuthorTalkFn,
  Precautions: PrecautionsFn,
  Series: SeriesFn,
});
