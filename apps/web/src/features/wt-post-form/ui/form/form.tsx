"use client";

import { ZodError } from "zod";
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
import { ChangeEventHandler, ComponentProps, KeyboardEventHandler, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { objectEntries, useToggle } from "@pency/util";
import { EvaMoreHorizontalOutlineIcon, Menux, RadioButton, toast, useMenuxState } from "@pency/ui/components";
import ky from "ky";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import {
  Age,
  AGE_LABEL,
  CREATION_TYPE_LABEL,
  CreationType,
  Genre,
  GENRE_LABEL,
  Pair,
  PAIR_LABEL,
} from "@/shared/config/webtoon/const";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";
import { formSchema, FormSchema } from "../../model/form-schema";
import { DataProvider, useData } from "../../model/data-provider";
import { QueryError } from "@/shared/lib/ky/api-client";
import { usePublish } from "../../model/use-publish";
import { useProvision } from "../../model/use-provision";
import { useSave } from "../../model/use-save";
import { keywordSchema } from "../../model/keyword-schema";
import { getUploadThumbnailUrl } from "@/entities/wt-episode-me";

// ----------------------------------------------------------------------

type FormFnProps = {
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
  children?: React.ReactNode;
} & ComponentProps<typeof DataProvider>;

const FormFn = ({ id, publish, channelUrl, children, ...rest }: FormFnProps) => {
  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
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
      <DataProvider id={id} publish={publish} channelUrl={formatChannelUrl(channelUrl, { prefix: false })}>
        {children}
      </DataProvider>
    </FormProvider>
  );
};

// ----------------------------------------------------------------------

type SubmitFnProps = Omit<ButtonProps, "children"> & {
  submitErrorHandler?: SubmitErrorHandler<FormSchema>;
};

const SubmitButtonFn = ({ submitErrorHandler, ...rest }: SubmitFnProps) => {
  const { handleSubmit } = useFormContext<FormSchema>();
  const { id, channelUrl, publish } = useData();
  const [loading, toggleLoading] = useToggle(false);
  const router = useRouter();

  const { mutate: publishPost } = usePublish();
  const { mutateAsync: provisionPost } = useProvision();

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
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
        },
        onSettled: () => {
          toggleLoading(false);
        },
      },
    );
  };

  const onSubmitError: SubmitErrorHandler<FormSchema> = (errors, e) => {
    submitErrorHandler?.(errors, e);
  };

  return (
    <LoadingButton
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
  const { trigger, getFieldState, getValues } = useFormContext<FormSchema>();
  const { id, channelUrl, publish } = useData();
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
        <LoadingButton variant="soft" size="small" loading={loading} onClick={handleClick}>
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
  const { control } = useFormContext<FormSchema>();

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
  const { control } = useFormContext<FormSchema>();
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
  const { control } = useFormContext<FormSchema>();
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
  const { control } = useFormContext<FormSchema>();
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
  const { control } = useFormContext<FormSchema>();
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
  const { control } = useFormContext<FormSchema>();
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
  const { control } = useFormContext<FormSchema>();

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
  const { control } = useFormContext<FormSchema>();

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

const ThumbnailFn = () => {
  const theme = useTheme();
  const { control } = useFormContext<FormSchema>();
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

export const Form = Object.assign(FormFn, {
  SubmitButton: SubmitButtonFn,
  MoreIconButton: MoreIconButtonFn,
  SaveButton: SaveButtonFn,
  Title: TitleFn,
  Genre: GenreFn,
  CreationType: CreationTypeFn,
  Pair: PairFn,
  Age: AgeFn,
  Keywords: KeywordsFn,
  AuthorTalk: AuthorTalkFn,
  Precaution: PrecautionFn,
  Thumbnail: ThumbnailFn,
});
