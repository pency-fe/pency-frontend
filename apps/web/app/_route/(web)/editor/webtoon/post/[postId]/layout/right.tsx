"use client";

import { schema } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  dialogClasses,
  Grid,
  IconButton,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormDialog, MaterialSymbolsCloseIcon, RadioMenuItem } from "@pency/ui/components";
import { useBooleanState } from "@pency/util";
import { useForm } from "react-hook-form";

// ----------------------------------------------------------------------

export default function Right() {
  const theme = useTheme();
  const { bool: dialogShow, setTrue: openDialog, setFalse: closeDialog } = useBooleanState(false);

  const handleClickOpen = () => {
    openDialog();
  };

  const handleClose = () => {
    closeDialog();
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
