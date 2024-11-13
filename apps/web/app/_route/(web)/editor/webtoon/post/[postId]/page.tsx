"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  dialogClasses,
  Divider,
  Grid,
  IconButton,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormDialog, MaterialSymbolsCloseIcon, RadioMenuItem } from "@pency/ui/components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ----------------------------------------------------------------------

const schema = z.object({
  title: z.string().min(1, "제목을 입력해 주세요.").max(100, "제목은 100자 이내로 입력해 주세요."),
  creationType: z.enum(["오리지널", "1차 창작", "N차 창작"]),
  pair: z.enum(["없음", "HL", "BL", "GL"]),
  genre: z
    .enum(["", "로맨스", "판타지", "액션", "데일리", "코믹", "드라마", "스릴러", "무협", "스포츠", "자기개발", "기타"])
    .refine((value) => value !== "", {
      message: "장르를 선택해야 합니다.",
    }),
  age: z.enum(["전체", "성인"]),
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

export function PostIdPage() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  const { handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      creationType: "오리지널",
      pair: "없음",
      genre: undefined,
      age: "전체",
      keywords: [],
      keyword: "",
      authorTalk: "",
      precautions: "",
      series: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async () => {
    console.log("!!");
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        발행
      </Button>

      <FormDialog
        open={open}
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
              <RadioGroup>
                <RadioMenuItem value="아이템1">아이템1</RadioMenuItem>
                <RadioMenuItem value="아이템2">아이템2</RadioMenuItem>
                <RadioMenuItem value="아이템3">아이템3</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
              </RadioGroup>
            </Grid>

            <Grid item xs={9} sx={{ height: 1, pl: "20px", py: "20px", overflow: "hidden scroll" }}>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)} noValidate></form>
        </FormDialog.Body>

        <FormDialog.Footer>
          <Button type="submit" variant="soft" color="primary" size="medium">
            발행
          </Button>
        </FormDialog.Footer>
      </FormDialog>
    </>
  );
}
