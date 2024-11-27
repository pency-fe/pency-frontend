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
  tabsClasses,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormDialog, MaterialSymbolsCloseIcon, RadioMenuItem } from "@pency/ui/components";
import { objectEntries, useBooleanState } from "@pency/util";
import { useWTPostFormContext, WT_Post_Create_Form } from "_core/webtoon/post";
import { useParams } from "next/navigation";
import { useState } from "react";

// ----------------------------------------------------------------------

type NavValue = "publish" | "keyword" | "public" | "notification";

const NAV_VALUE_LABEL: Record<NavValue, string> = {
  publish: "발행",
  keyword: "키워드",
  public: "공개 범위",
  notification: "공지사항",
} as const;

export default function HeaderRight() {
  const theme = useTheme();
  const { channelUrl } = useParams<{ channelUrl: string }>();

  const [navValue, setNavValue] = useState<NavValue>("publish");

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
        closeAfterTransition={false}
        sx={{
          [theme.breakpoints.up("sm")]: {
            [`& .${dialogClasses.paper}`]: {
              maxWidth: "700px",
              height: "620px",
              maxHeight: 1,
            },
          },
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
              <IconButton color="inherit" onClick={closeDialog}>
                <MaterialSymbolsCloseIcon />
              </IconButton>
              <Typography variant="h6" sx={{ ml: theme.spacing(1) }}>
                발행 옵션
              </Typography>

              <WT_Post_Create_Form.CreateSubmitButton channelUrl={channelUrl} sx={{ ml: "auto" }} />
            </>
          )}
        </FormDialog.Header>

        <FormDialog.Body
          sx={{
            pt: 0,
            [theme.breakpoints.up("sm")]: { py: 0 },
          }}
        >
          <Grid
            container
            sx={{ gap: theme.spacing(2), [theme.breakpoints.up("sm")]: { width: 1, height: 1, gap: theme.spacing(0) } }}
          >
            <Grid
              item
              xs={12}
              sm={3}
              sx={{
                [theme.breakpoints.up("sm")]: {
                  height: 1,
                  pr: "20px",
                  py: "20px",
                  border: 0,
                  borderRightWidth: "thin",
                  borderStyle: "solid",
                  borderColor: theme.vars.palette.divider,
                  overflow: "hidden scroll",
                },
              }}
            >
              {isUpSm ? (
                <RadioGroup
                  value={navValue}
                  onChange={(e) => {
                    setNavValue(e.target.value as NavValue);
                  }}
                >
                  {objectEntries(NAV_VALUE_LABEL).map(([value, label]) => (
                    <RadioMenuItem value={value} key={value}>
                      {label}
                    </RadioMenuItem>
                  ))}
                </RadioGroup>
              ) : (
                <Tabs
                  value={navValue}
                  onChange={(_, value) => {
                    setNavValue(value as NavValue);
                  }}
                  variant="scrollable"
                  scrollButtons={false}
                  sx={{ [`& .${tabsClasses.flexContainer}`]: { gap: 2 } }}
                >
                  {objectEntries(NAV_VALUE_LABEL).map(([value, label]) => (
                    <Tab
                      label={<Typography variant="subtitle2">{label}</Typography>}
                      value={value}
                      key={value}
                      wrapped
                    />
                  ))}
                </Tabs>
              )}
            </Grid>

            <Grid
              item
              xs={12}
              sm={9}
              sx={{ [theme.breakpoints.up("sm")]: { height: 1, pl: "20px", py: "20px", overflow: "hidden scroll" } }}
            >
              {navValue === "publish" && (
                <Stack spacing={4}>
                  <WT_Post_Create_Form.Series />
                  <WT_Post_Create_Form.Thumbnail />
                </Stack>
              )}
              {navValue === "keyword" && (
                <Stack spacing={4}>
                  <WT_Post_Create_Form.CreationType />
                  <WT_Post_Create_Form.Pair />
                  <WT_Post_Create_Form.Keywords />
                </Stack>
              )}
              {navValue === "public" && (
                <Stack spacing={4}>
                  <WT_Post_Create_Form.Age />
                </Stack>
              )}
              {navValue === "notification" && (
                <Stack spacing={4}>
                  <WT_Post_Create_Form.AuthorTalk />
                  <WT_Post_Create_Form.Precaution />
                </Stack>
              )}
            </Grid>
          </Grid>
        </FormDialog.Body>

        {isUpSm && (
          <FormDialog.Footer>
            <WT_Post_Create_Form.CreateSubmitButton channelUrl={channelUrl} />
          </FormDialog.Footer>
        )}
      </FormDialog>
    </>
  );
}
