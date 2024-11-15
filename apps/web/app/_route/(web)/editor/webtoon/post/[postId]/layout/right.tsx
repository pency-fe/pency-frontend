"use client";

import {
  Button,
  dialogClasses,
  Grid,
  IconButton,
  RadioGroup,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormDialog, MaterialSymbolsCloseIcon, RadioMenuItem } from "@pency/ui/components";
import { useBooleanState } from "@pency/util";
import { WT_Post_Create_Form } from "_core/webtoon/post";
import { useState } from "react";

// ----------------------------------------------------------------------

export default function Right() {
  const theme = useTheme();
  const { bool: dialogShow, setTrue: openDialog, setFalse: closeDialog } = useBooleanState(false);
  const [state, setState] = useState("publish");

  const handleClickOpen = () => {
    openDialog();
  };

  const handleClose = () => {
    closeDialog();
  };

  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  const onSubmit = async () => {
    console.log("!!");
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        발행
      </Button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <WT_Post_Create_Form>
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
        </WT_Post_Create_Form>
      </form>
    </>
  );
}
