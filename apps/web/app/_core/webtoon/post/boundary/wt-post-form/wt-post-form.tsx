"use client";

import { z, ZodError } from "zod";
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  Box,
  Button,
  ButtonProps,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  inputBaseClasses,
  MenuItem,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChangeEventHandler,
  createContext,
  KeyboardEventHandler,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Age, AGE_LABEL, CREATION_TYPE_LABEL, CreationType, Pair, PAIR_LABEL } from "../../const";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";
import { formatUrl, objectEntries, useToggle, zodObjectKeys } from "@pency/util";
import { EvaMoreHorizontalOutlineIcon, Menux, RadioButton, toast, useMenuxState } from "@pency/ui/components";
import ky from "ky";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { Editor } from "./editor";
import { useProvision, usePublish, useSave } from "../../query";
import { getUploadThumbnailUrl } from "../../query/api";
import { QueryError } from "_core/api";

// ----------------------------------------------------------------------

const keywordSchema = z
  .string()
  .regex(/^[가-힣a-zA-Z0-9_]+$/, "키워드는 한글, 영문, 숫자, 밑줄(_)만 입력할 수 있어요.")
  .max(20, "키워드는 20자 이내로 입력해 주세요.");

const schema = z
  .object({
    title: z.string().min(1, "제목을 입력해 주세요.").max(100, "최대 100자 이내로 입력해 주세요."),
    genre: z.enum(zodObjectKeys(GENRE_LABEL), { message: "장르를 선택해 주세요." }),
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

export function useWTPostFormContext() {
  return useFormContext<Schema>();
}

// ----------------------------------------------------------------------

const WTPostFormDataContext = createContext<{ publish: boolean; channelUrl: string; id?: number } | undefined>(
  undefined,
);

export function useWTPostFormDataContext() {
  const context = useContext(WTPostFormDataContext);

  if (!context) {
    throw new Error(`<부모로 <WT_Post_Form /> 컴포넌트가 있어야 합니다.`);
  }

  return context;
}

// ----------------------------------------------------------------------

type WT_Post_Form_Fn_Props = {
  title?: string;
  genre?: Genre;
  price?: number | null;
  free?: Array<{ name: string; src: string }> | null;
  paid?: Array<{ name: string; src: string }> | null;
  thumbnail?: string | null;
  creationType?: CreationType;
  pair?: Pair;
  age?: Age;
  keywords?: Array<string>;
  authorTalk?: string | null;
  precaution?: string | null;
  id?: number;
  publish: boolean;
  channelUrl: string;
  children?: ReactNode;
};

const WT_Post_Form_Fn = ({ id, publish, channelUrl, children, ...rest }: WT_Post_Form_Fn_Props) => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: rest.title ?? "",
      genre: rest.genre ?? ("" as Genre),
      price: rest.price ?? 0,
      content: {
        free: rest.free ?? [],
        paid: rest.paid ?? [],
      },
      thumbnail: rest.thumbnail ?? "",
      creationType: rest.creationType ?? "PRIMARY",
      pair: rest.pair ?? "NONE",
      age: rest.age ?? "ALL",
      keywords: rest.keywords ?? [],
      authorTalk: rest.authorTalk ?? "",
      precaution: rest.precaution ?? "",
    },
    mode: "onTouched",
  });

  return (
    <FormProvider {...methods}>
      <WTPostFormDataContext.Provider value={{ id, publish, channelUrl: formatUrl(channelUrl, { prefix: false }) }}>
        {children}
      </WTPostFormDataContext.Provider>
    </FormProvider>
  );
};

// ----------------------------------------------------------------------

type SubmitFnProps = Omit<ButtonProps, "children"> & {
  submitErrorHandler?: SubmitErrorHandler<Schema>;
};

const SubmitButtonFn = ({ submitErrorHandler, ...rest }: SubmitFnProps) => {
  const { handleSubmit } = useWTPostFormContext();
  const { id, channelUrl, publish } = useWTPostFormDataContext();
  const [loading, toggleLoading] = useToggle(false);
  const router = useRouter();

  const { mutate: publishPost } = usePublish();
  const { mutateAsync: provisionPost } = useProvision();

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    toggleLoading(true);
    let postId = id;

    if (!postId) {
      try {
        postId = (await provisionPost({ channelUrl })).id;
        window.history.replaceState(null, "", `/editor/@${channelUrl}/webtoon/${postId}`);
      } catch (error) {
        if (error instanceof QueryError && error.code === "ENTITY_NOT_FOUND") {
          toast.error("잘못된 채널 URL이에요.");
        }
        if (error instanceof QueryError && error.code === "ACCESS_DENIED") {
          toast.error("권한이 없어요.");
        }
        toggleLoading(false);
        return;
      }
    }

    const { content, ...rest } = data;
    publishPost(
      { id: postId, ...rest, ...content },
      {
        onSuccess: (data) => {
          router.push(`/@${channelUrl}/webtoon/post/${data.id}`);
        },
        onError: (error) => {
          if (error.code === "ENTITY_NOT_FOUND") {
            toast.error("잘못된 채널 URL이에요.");
          }
          if (error.code === "ACCESS_DENIED") {
            toast.error("권한이 없어요.");
          }
        },
        onSettled: () => {
          toggleLoading(false);
        },
      },
    );
  };

  const onSubmitError: SubmitErrorHandler<Schema> = (errors, e) => {
    submitErrorHandler?.(errors, e);
  };

  return (
    <LoadingButton
      type="submit"
      variant="contained"
      color="primary"
      loading={loading}
      onClick={handleSubmit(onSubmit, onSubmitError)}
      {...rest}
    >
      {!publish ? "발행" : "재발행"}
    </LoadingButton>
  );
};

// ----------------------------------------------------------------------

const SaveButtonFn = () => {
  const { trigger, getFieldState, getValues } = useWTPostFormContext();
  const { id, channelUrl, publish } = useWTPostFormDataContext();
  const [loading, toggleLoading] = useToggle(false);

  const { mutate: savePost } = useSave();
  const { mutateAsync: provisionPost } = useProvision();

  const handleClick = async () => {
    const names = ["title", "genre", "content", "price"] as const;

    const isValidate = await trigger(names);
    if (!isValidate) {
      for (const name of names) {
        if (getFieldState(name).error) {
          document.getElementsByName(name)[0]?.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }
      }
    }

    toggleLoading(true);
    let postId = id;
    if (!postId) {
      try {
        postId = (await provisionPost({ channelUrl })).id;
        window.history.replaceState(null, "", `/editor/@${channelUrl}/webtoon/${postId}`);
      } catch (error) {
        if (error instanceof QueryError && error.code === "ENTITY_NOT_FOUND") {
          toast.error("잘못된 채널 URL이에요.");
        }
        if (error instanceof QueryError && error.code === "ACCESS_DENIED") {
          toast.error("권한이 없어요.");
        }
        toggleLoading(false);
        return;
      }
    }

    const [title, genre, { free, paid }, price] = getValues(names);
    savePost(
      { id: postId, title, genre, price, free, paid },
      {
        onSuccess: () => {
          toast.success("포스트를 저장했어요.");
        },
        onError: (error) => {
          if (error.code === "ENTITY_NOT_FOUND") {
            toast.error("잘못된 채널 URL이에요.");
          }
          if (error.code === "SAVED_POST_FORBIDDEN") {
            toast.error("이미 발행된 포스트는 임시 저장할 수 없어요.");
          }
          if (error.code === "ACCESS_DENIED") {
            toast.error("권한이 없어요.");
          }
        },
        onSettled: () => {
          toggleLoading(false);
        },
      },
    );
  };

  return (
    <>
      {!publish ? (
        <LoadingButton type="submit" variant="soft" size="small" loading={loading} onClick={handleClick}>
          저장
        </LoadingButton>
      ) : null}
    </>
  );
};

// ----------------------------------------------------------------------

const MoreIconButtonFn = () => {
  const { anchorRef, isOpen, close, toggle } = useMenuxState();

  return (
    <>
      <IconButton ref={anchorRef} variant="text" size="small" onClick={toggle}>
        <EvaMoreHorizontalOutlineIcon />
      </IconButton>
      <Menux
        open={isOpen}
        anchorEl={anchorRef.current}
        placement="left-start"
        disablePortal
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 6],
            },
          },
        ]}
        onClose={close}
      >
        {/* [TODO] */}
        <MenuItem>미리보기</MenuItem>
        <MenuItem>발행취소</MenuItem>
        <MenuItem>휴지통으로 이동</MenuItem>
      </Menux>
    </>
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
          autoComplete="off"
          type="text"
          label="포스트 제목"
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

const KeywordsFn = () => {
  const { control } = useWTPostFormContext();
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

const AgeFn = () => {
  const { control } = useWTPostFormContext();
  const ageLabels = objectEntries(AGE_LABEL);

  return (
    <Controller
      control={control}
      name="age"
      render={({ field }) => (
        <Stack spacing={1}>
          <Typography variant="subtitle2">연령</Typography>
          <RadioGroup {...field}>
            <Grid container spacing={1}>
              {ageLabels.map(([value, label]) => (
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

const ThumbnailFn = () => {
  const theme = useTheme();
  const { control } = useWTPostFormContext();
  const {
    field: { value, onChange },
  } = useController({ control, name: "thumbnail" });
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

        const res = await getUploadThumbnailUrl({
          contentLength: picker.files[0].size,
          contentType: picker.files[0].type as Parameters<typeof getUploadThumbnailUrl>[0]["contentType"],
        });
        await ky.put(res.signedUploadUrl, { body: picker.files[0] });
        toggleLoading(false);
        onChange(res.url);
      }
    });
    picker.click();
  };

  const remove = () => {
    onChange("");
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
          <Box
            component="img"
            src={value.length ? value : process.env["NEXT_PUBLIC_TEXT_LOGO"]}
            sx={{ width: 1, height: 1, objectFit: "cover" }}
          />
        </Box>

        <Stack direction="row" alignItems="center">
          <Typography variant="overline" color={theme.vars.palette.text.secondary} mr="auto">
            추천 비율(16:9) / 최대 10MB 이미지 파일
          </Typography>

          {value && (
            <Button variant="soft" color="error" sx={{ mr: 1 }} onClick={remove}>
              삭제
            </Button>
          )}

          <LoadingButton variant="soft" color="primary" loading={loading} onClick={upload}>
            업로드
          </LoadingButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

// ----------------------------------------------------------------------

export const WT_Post_Form = Object.assign(WT_Post_Form_Fn, {
  SubmitButton: SubmitButtonFn,
  SaveButton: SaveButtonFn,
  MoreIconButton: MoreIconButtonFn,
  Title: TitleFn,
  Genre: GenreFn,
  Editor: Editor,
  CreationType: CreationTypeFn,
  Pair: PairFn,
  Age: AgeFn,
  Keywords: KeywordsFn,
  AuthorTalk: AuthorTalkFn,
  Precaution: PrecautionFn,
  Thumbnail: ThumbnailFn,
});
