"use client";

import {
  Button,
  dialogClasses,
  Grid,
  IconButton,
  RadioGroup,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormDialog, MaterialSymbolsCloseIcon, RadioMenuItem } from "@pency/ui/components";
import { useBooleanState } from "@pency/util";
import { useWTPostFormContext, WT_Post_Create_Form } from "_core/webtoon/post";
import { SyntheticEvent, useState } from "react";

// ----------------------------------------------------------------------

export default function Right() {
  const theme = useTheme();
  const [state, setState] = useState("publish");

  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  const { trigger } = useWTPostFormContext();

  const { bool: dialogShow, setTrue: openDialog, setFalse: closeDialog } = useBooleanState(false);

  const handleClickOpen = async () => {
    const isValidate = await trigger(["title", "genre"]);
    if (!isValidate) {
      return;
    }
    openDialog();
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        발행
      </Button>

      <FormDialog
        open={dialogShow}
        onClose={closeDialog}
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
          {isUpSm ? (
            <>
              <Typography sx={{ flex: 1 }} variant="h6">
                발행 옵션
              </Typography>

              <IconButton edge="end" color="inherit" onClick={closeDialog}>
                <MaterialSymbolsCloseIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Stack spacing={2} flexDirection="row" alignItems="center" flexGrow={1}>
                <IconButton edge="end" color="inherit" onClick={closeDialog}>
                  <MaterialSymbolsCloseIcon />
                </IconButton>
                <Typography variant="h6">발행 옵션</Typography>
              </Stack>
              <WT_Post_Create_Form.CreateSubmitButton />
            </>
          )}
        </FormDialog.Header>

        <FormDialog.Body
          sx={{
            py: 0,
            [theme.breakpoints.up("sm")]: { py: 0 },
          }}
        >
          <Grid container direction={isUpSm ? "row" : "column"} sx={{ width: 1, height: 1 }}>
            <Grid
              item
              xs={isUpSm ? 3 : 0.5}
              sx={{
                height: 1,
                [theme.breakpoints.up("sm")]: {
                  pr: "20px",
                  py: "20px",
                  border: 0,
                  borderRightWidth: "thin",
                  borderStyle: "solid",
                  borderColor: theme.vars.palette.divider,
                  overflow: "hidden scroll",
                },
                width: 1,
              }}
            >
              {isUpSm ? (
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
              ) : (
                <Tabs
                  value={state}
                  onChange={(e: SyntheticEvent, value: string) => {
                    setState(value);
                  }}
                  variant="scrollable"
                  scrollButtons={false}
                >
                  <Tab label="발행" value="publish" />
                  <Tab label="키워드" value="keyword" />
                  <Tab label="공개 범위" value="public" />
                  <Tab label="공지사항" value="notification" />
                  <Tab label="공지사항" value="notification" />
                  <Tab label="공지사항" value="notification" />
                  <Tab label="공지사항" value="notification" />
                  <Tab label="공지사항" value="notification" />
                  <Tab label="공지사항" value="notification" />
                </Tabs>
              )}
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

        {isUpSm ? (
          <FormDialog.Footer>
            <WT_Post_Create_Form.CreateSubmitButton />
          </FormDialog.Footer>
        ) : (
          ""
        )}
      </FormDialog>
    </>
  );
}
