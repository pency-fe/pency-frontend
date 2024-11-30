"use client";

import { z, ZodError } from "zod";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
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
  Typography,
  useTheme,
} from "@mui/material";
import { ChangeEventHandler, KeyboardEventHandler, ReactNode, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AGE_LABEL, CREATION_TYPE_LABEL, PAIR_LABEL } from "../../const";
import { GENRE_LABEL } from "_core/webtoon/const";
import { objectEntries, useBooleanState, zodObjectKeys } from "@pency/util";
import { BrandPencyTextIcon, RadioButton, toast } from "@pency/ui/components";
import { Editor } from "./editor";
import { varAlpha } from "@pency/ui/util";
import { getUploadImageUrl } from "_core/common";
import ky from "ky";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { useWebtoonPostPublish } from "../../query";

// ----------------------------------------------------------------------

const keywordSchema = z
  .string()
  .regex(/^[가-힣a-zA-Z0-9_]+$/, "키워드는 한글, 영문, 숫자, 밑줄(_)만 입력할 수 있어요.")
  .max(20, "키워드는 20자 이내로 입력해 주세요.");

const schema = z
  .object({
    title: z.string().trim().min(1, "제목을 입력해 주세요.").max(100, "최대 100자 이내로 입력해 주세요."),
    genre: z.string().refine((genre) => Object.keys(GENRE_LABEL).includes(genre), { message: "장르를 선택해 주세요." }),
    price: z.coerce.number(),
    content: z
      .object({
        free: z.array(z.object({ name: z.string(), src: z.string().url() })),
        paid: z.array(z.object({ name: z.string(), src: z.string().url() })),
      })
      .refine(({ free, paid }) => free.length + paid.length === 0, { message: "웹툰 원고를 작성해 주세요." })
      .refine(({ free, paid }) => free.length + paid.length > 100, { message: "최대 100장까지 작성할 수 있어요." }),
    thumbnail: z.string(),
    creationType: z.enum(zodObjectKeys(CREATION_TYPE_LABEL)),
    pair: z.enum(zodObjectKeys(PAIR_LABEL)),
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
      price: 0,
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
      authorTalk: "",
      precaution: "",
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
      authorTalk: "",
      precaution: "",
    },
    mode: "onTouched",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

// ----------------------------------------------------------------------

type CreateSubmitFnProps = Omit<ButtonProps, "children"> & { channelUrl: string };

const CreateSubmitFn = ({ channelUrl, ...rest }: CreateSubmitFnProps) => {
  const router = useRouter();
  const { handleSubmit, watch } = useWTPostFormContext();

  const { mutate } = useWebtoonPostPublish();

  const onSubmit = (data: Schema) => {
    console.log(data);

    // const mutateData: Parameters<typeof mutate>[0] = {
    //   channelUrl,
    //   ...data,
    // };
    // mutate(mutateData, {
    //   onSuccess: (data) => {
    //     router.push(`/@${channelUrl}/webtoon/post/${data.postId}`);
    //   },
    // });
  };

  return (
    <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)} {...rest}>
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

const PriceFn = () => {
  const { control, watch } = useWTPostFormContext();
  const paid = watch("content.paid");

  const hasPaid = useMemo(() => paid.length !== 0, [paid]);

  return (
    <>
      <Controller
        control={control}
        name="price"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            variant="outlined"
            fullWidth
            onChange={(event) => {
              if (/^\d*$/.test(event.target.value)) {
                event.target.value = `${Number(event.target.value)}`;
                field.onChange(event);
              }
            }}
            inputProps={{ inputMode: "numeric" }}
            label="가격 설정"
            required
            disabled={!hasPaid}
            helperText={(() => {
              if (hasPaid && error) {
                return error.message;
              }
              if (hasPaid && !error) {
                return "100P 단위로 입력해 주세요.";
              }
              if (!hasPaid) {
                return "유료 분량이 있을 때만 설정할 수 있어요.";
              }
            })()}
            error={hasPaid && !!error}
          />
        )}
      />
    </>
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
  const { watch, setValue } = useWTPostFormContext();
  const keywords = watch("keywords");

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
      if (keywords.length >= 10) {
        toast.error("키워드는 최대 10개 이내로 입력해 주세요.");
        return;
      }
      if (keywords.includes(keyword)) {
        toast.error("이미 입력한 키워드예요.");
        return;
      }

      const newKeywords = [...keywords];
      newKeywords.push(keyword);
      setValue("keywords", newKeywords);
      setKeyword("");
      return;
    }

    if (event.key === "Backspace") {
      if (keyword.length === 0) {
        const newKeywords = [...keywords];
        newKeywords.pop();
        setValue("keywords", newKeywords);
        return;
      }
    }
  };

  const deleteKeyword = (keyword: string) => {
    const index = keywords.indexOf(keyword);
    if (index !== -1) {
      const newKeywords = [...keywords];
      newKeywords.splice(index, 1);
      setValue("keywords", newKeywords);
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
          startAdornment: keywords.map((keyword, i) => (
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
                <Typography variant="caption">{field.value.length}/200</Typography>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

// ----------------------------------------------------------------------

const PrecautionFn = () => {
  const { control } = useWTPostFormContext();

  return (
    <Controller
      control={control}
      name="precaution"
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
                <Typography variant="caption">{field.value.length}/200</Typography>
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
  const theme = useTheme();
  const { watch, setValue } = useWTPostFormContext();
  const thumbnail = watch("thumbnail");
  const loading = useBooleanState(false);

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

        loading.setTrue();
        const res = await getUploadImageUrl({
          contentLength: picker.files[0].size,
          contentType: picker.files[0].type as Parameters<typeof getUploadImageUrl>[0]["contentType"],
        });
        await ky.put(res.signedUploadUrl, { body: picker.files[0] });
        loading.setFalse();
        setValue("thumbnail", res.url);
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
            추천 비율(16:9) / 최대 50MB 이미지 파일
          </Typography>

          {thumbnail && (
            <Button variant="text" sx={{ mr: 1 }} onClick={remove}>
              삭제
            </Button>
          )}

          <LoadingButton variant="soft" color="primary" loading={loading.bool} onClick={upload}>
            업로드
          </LoadingButton>
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
  Price: PriceFn,
  Editor: Editor,
  CreationType: CreationTypeFn,
  Pair: PairFn,
  Age: AgeFn,
  Keywords: KeywordsFn,
  Keyword: KeywordFn,
  AuthorTalk: AuthorTalkFn,
  Precaution: PrecautionFn,
  Series: SeriesFn,
  Thumbnail: ThumbnailFn,
  useWTPostFormContext,
});

// ----------------------------------------------------------------------

export const WT_Post_Update_Form = Object.assign(WT_Post_Update_Form_Fn, {
  UpdateSubmitButton: UpdateSubmitFn,
  Title: TitleFn,
  Genre: GenreFn,
  // Editor: Editor,
  CreationType: CreationTypeFn,
  Pair: PairFn,
  Age: AgeFn,
  Keywords: KeywordsFn,
  Keyword: KeywordFn,
  AuthorTalk: AuthorTalkFn,
  Precaution: PrecautionFn,
  Series: SeriesFn,
});
