"use client";

import { Schema, z } from "zod";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import {
  Button,
  ButtonProps,
  dialogClasses,
  Grid,
  IconButton,
  InputAdornment,
  inputBaseClasses,
  MenuItem,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AGE_LABEL, CREATION_TYPE_LABEL, PAIR_LABEL } from "../const";
import { GENRE_LABEL } from "_core/webtoon/const";
import { objectEntries, useBooleanState, zodObjectKeys } from "@pency/util";
import { FormDialog, MaterialSymbolsCloseIcon, RadioButton, RadioMenuItem } from "@pency/ui/components";

// ----------------------------------------------------------------------

const schema = z.object({
  title: z.string().min(1, "제목을 입력해 주세요.").max(100, "제목은 100자 이내로 입력해 주세요."),
  creationType: z.enum(zodObjectKeys(CREATION_TYPE_LABEL)),
  pair: z.enum(zodObjectKeys(PAIR_LABEL)),
  genre: z.enum(zodObjectKeys(GENRE_LABEL), {
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

type ValidateSubmitFnProps = Omit<ButtonProps, "children">;

const ValidateSubmitFn = (props: ValidateSubmitFnProps) => {
  const theme = useTheme();
  const [state, setState] = useState("publish");

  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  const { trigger } = useFormContext<Schema>();
  const { bool: dialogShow, setTrue: openDialog, setFalse: closeDialog } = useBooleanState(false);

  const handleClickOpen = async () => {
    const isValidate = await trigger(["title", "genre"]);
    if (isValidate) {
      openDialog();
    } else {
      return;
    }
  };

  const handleClose = () => {
    closeDialog();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      noValidate
    >
      <Button type="submit" variant="contained" onClick={handleClickOpen}>
        발행
      </Button>

      <FormDialog
        open={dialogShow}
        onClose={handleClose}
        fullWidth
        fullScreen={!isUpSm}
        sx={{
          ...(isUpSm && {
            [`& .${dialogClasses.paper}`]: {
              maxWidth: "700px",
              height: "620px",
              maxHeight: 1,
            },
          }),
        }}
      >
        <FormDialog.Header>
          <Typography sx={{ flex: 1 }} variant="h6">
            발행 옵션
          </Typography>

          <IconButton edge="end" color="inherit" onClick={handleClose}>
            <MaterialSymbolsCloseIcon />
          </IconButton>
        </FormDialog.Header>

        <FormDialog.Body
          sx={{
            py: 0,
            [theme.breakpoints.up("sm")]: { py: 0 },
          }}
        >
          <Grid container sx={{ width: 1, height: 1 }}>
            <Grid
              item
              xs={3}
              sx={{
                height: 1,
                pr: "20px",
                py: "20px",
                border: 0,
                borderRightWidth: "thin",
                borderStyle: "solid",
                borderColor: theme.vars.palette.divider,
                overflow: "hidden scroll",
              }}
            >
              <RadioGroup
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              >
                <RadioMenuItem value="publish">발행</RadioMenuItem>
                <RadioMenuItem value="keyword">키워드</RadioMenuItem>
                <RadioMenuItem value="public">공개 범위</RadioMenuItem>
                <RadioMenuItem value="notification">공지사항</RadioMenuItem>
              </RadioGroup>
            </Grid>

            <Grid item xs={9} sx={{ height: 1, pl: "20px", py: "20px", overflow: "hidden scroll" }}>
              {state === "publish" && (
                <Stack spacing={4}>
                  <WT_Post_Create_Form.Series />
                  <WT_Post_Create_Form.Thumbnail />
                </Stack>
              )}
              {state === "keyword" && (
                <Stack spacing={4}>
                  <WT_Post_Create_Form.CreationType />
                  <WT_Post_Create_Form.Pair />
                  <WT_Post_Create_Form.Keywords />
                </Stack>
              )}
              {state === "public" && (
                <Stack spacing={4}>
                  <WT_Post_Create_Form.Age />
                </Stack>
              )}
              {state === "notification" && (
                <Stack spacing={4}>
                  <WT_Post_Create_Form.AuthorTalk />
                  <WT_Post_Create_Form.Precautions />
                </Stack>
              )}
            </Grid>
          </Grid>
        </FormDialog.Body>

        <FormDialog.Footer>
          <WT_Post_Create_Form.CreateSubmitButton />
        </FormDialog.Footer>
      </FormDialog>
    </form>
  );
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
  const { control } = useFormContext<Schema>();
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
  const { control } = useFormContext<Schema>();
  const entries = objectEntries(GENRE_LABEL);

  return (
    <Controller
      control={control}
      name="genre"
      render={({ field, fieldState: { error } }) => (
        <Stack spacing={1}>
          <TextField
            {...field}
            id="outlined-select-currency"
            select
            label="장르"
            defaultValue=""
            required
            helperText={error ? error.message : ""}
            error={!!error}
          >
            {entries.map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
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
  ValidateSubmitButton: ValidateSubmitFn,
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
  ValidateSubmitButton: ValidateSubmitFn,
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
