"use client";

import { z } from "zod";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import {
  Button,
  ButtonProps,
  Grid,
  InputAdornment,
  inputBaseClasses,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Age, AGE_LABEL, CREATION_TYPE_LABEL, CreationType, Pair, PAIR_LABEL } from "../const";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";
import { objectEntries, zodObjectKeys } from "@pency/util";
import { RadioButton } from "@pency/ui/components";

// ----------------------------------------------------------------------

const schema = z.object({
  title: z.string().min(1, "제목을 입력해 주세요.").max(100, "제목은 100자 이내로 입력해 주세요."),
  creationType: z.enum(zodObjectKeys(CREATION_TYPE_LABEL)),
  pair: z.enum(zodObjectKeys(PAIR_LABEL)),
  genre: z.enum(["", ...zodObjectKeys(GENRE_LABEL)]).refine((value) => value !== "", {
    message: "장르를 선택해 주세요.",
  }),
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

type WT_Post_Create_Form_Fn_Props = {
  children?: ReactNode;
};

const WT_Post_Create_Form_Fn = ({ children }: WT_Post_Create_Form_Fn_Props) => {
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
  const { control } = useFormContext<Schema>();
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
                <Grid item>
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
  const { control } = useFormContext<Schema>();
  const pair = objectEntries(PAIR_LABEL);

  return (
    <Controller
      control={control}
      name="pair"
      render={({ field }) => (
        <Stack spacing={1}>
          <Typography variant="subtitle2">페어</Typography>
          <RadioGroup
            value={field.value}
            onChange={(e) => {
              field.onChange(e.target.value as Pair);
            }}
          >
            <Grid container spacing={1}>
              {Array.from(pair, ([key, value]) => (
                <Grid item>
                  <RadioButton value={key}>{value}</RadioButton>
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
  const { control } = useFormContext<Schema>();
  const genre = objectEntries(GENRE_LABEL);

  return (
    <Controller
      control={control}
      name="genre"
      render={({ field }) => (
        <Stack spacing={1}>
          <Typography variant="subtitle2">장르</Typography>
          <RadioGroup
            value={field.value}
            onChange={(e) => {
              field.onChange(e.target.value as Genre);
            }}
          >
            <Grid container spacing={1}>
              {Array.from(genre, ([key, value]) => (
                <Grid
                  item
                  sx={{
                    minWidth: 80, // 최소 너비를 120px로 설정
                    textAlign: "center", // 옵션: 중앙 정렬
                  }}
                >
                  <RadioButton value={key}>{value}</RadioButton>
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

const KeywordsFn = () => {
  return <Typography variant="subtitle2">키워드(배열)</Typography>;
};

// ----------------------------------------------------------------------

const KeywordFn = () => {
  return <Typography variant="subtitle2">키워드</Typography>;
};

// ----------------------------------------------------------------------

const AgeFn = () => {
  const { control } = useFormContext<Schema>();
  const age = objectEntries(AGE_LABEL);

  return (
    <Controller
      control={control}
      name="age"
      render={({ field }) => (
        <Stack spacing={1}>
          <Typography variant="subtitle2">연령</Typography>
          <RadioGroup
            value={field.value}
            onChange={(e) => {
              field.onChange(e.target.value as Age);
            }}
          >
            <Grid container spacing={1}>
              {Array.from(age, ([key, value]) => (
                <Grid item>
                  <RadioButton value={key}>{value}</RadioButton>
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
  const { control } = useFormContext<Schema>();

  return (
    <Controller
      control={control}
      name="authorTalk"
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          variant="outlined"
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

const PrecautionsFn = () => {
  const { control } = useFormContext<Schema>();

  return (
    <Controller
      control={control}
      name="precautions"
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          variant="outlined"
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

const SeriesFn = () => {
  return <Typography variant="subtitle2">시리즈</Typography>;
};

// ----------------------------------------------------------------------
const ThumbnailFn = () => {
  return <Typography variant="subtitle2">썸네일</Typography>;
};

// ----------------------------------------------------------------------

export const WT_Post_Create_Form = Object.assign(WT_Post_Create_Form_Fn, {
  CreateSubmitButton: CreateSubmitFn,
  Title: TitleFn,
  CreationType: CreationTypeFn,
  Pair: PairFn,
  Genre: GenreFn,
  Age: AgeFn,
  Keywords: KeywordsFn,
  Keyword: KeywordFn,
  AuthorTalk: AuthorTalkFn,
  Precautions: PrecautionsFn,
  Series: SeriesFn,
  Thumbnail: ThumbnailFn,
});

// ----------------------------------------------------------------------

export const WT_Post_Update_Form = Object.assign(WT_Post_Update_Form_Fn, {
  UpdateSubmitButton: UpdateSubmitFn,
  Title: TitleFn,
  CreationType: CreationTypeFn,
  Pair: PairFn,
  Genre: GenreFn,
  Age: AgeFn,
  Keywords: KeywordsFn,
  Keyword: KeywordFn,
  AuthorTalk: AuthorTalkFn,
  Precautions: PrecautionsFn,
  Series: SeriesFn,
});
