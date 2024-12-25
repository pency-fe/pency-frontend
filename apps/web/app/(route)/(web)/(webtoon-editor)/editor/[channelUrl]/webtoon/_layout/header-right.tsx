"use client";

import {
  Box,
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
import { objectEntries, objectKeys, useToggle } from "@pency/util";
import { useWTPostFormContext, WT_Post_Form } from "_core/webtoon/post";
import { ComponentProps, useState } from "react";

// ----------------------------------------------------------------------

type NavValue = "publish" | "keyword" | "public" | "notification";

const NAV_VALUE_LABEL: Record<NavValue, string> = {
  publish: "발행",
  keyword: "키워드",
  public: "공개 범위",
  notification: "공지사항",
} as const;

type FieldName = "thumbnail" | "creationType" | "pair" | "age" | "keywords" | "authorTalk" | "precaution";

const FIELD_NAME_TO_NAV_VALUE_MAP: Record<FieldName, NavValue> = {
  thumbnail: "public",
  creationType: "keyword",
  pair: "keyword",
  keywords: "keyword",
  age: "public",
  authorTalk: "notification",
  precaution: "notification",
};

export default function HeaderRight() {
  const theme = useTheme();
  const [navValue, setNavValue] = useState<NavValue>("publish");

  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  const { trigger, getFieldState } = useWTPostFormContext();

  const [dialog, toggleDialog] = useToggle(false);

  const handleClickOpen = async () => {
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

    toggleDialog(true);
  };

  const submitErrorHandler: ComponentProps<typeof WT_Post_Form.SubmitButton>["submitErrorHandler"] = (errors) => {
    const names = objectKeys(FIELD_NAME_TO_NAV_VALUE_MAP);

    for (const name of names) {
      if (errors[name]) {
        setNavValue(FIELD_NAME_TO_NAV_VALUE_MAP[name]);
        setTimeout(() => {
          document.getElementsByName(name)[0]?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 200);

        break;
      }
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: "6px" }}>
        <WT_Post_Form.MoreIconButton />
        <WT_Post_Form.SaveButton />
        <Button variant="contained" size="small" onClick={handleClickOpen}>
          발행
        </Button>
      </Box>

      <FormDialog
        open={dialog}
        onClose={() => toggleDialog(false)}
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

              <IconButton edge="end" color="inherit" onClick={() => toggleDialog(false)}>
                <MaterialSymbolsCloseIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton color="inherit" onClick={() => toggleDialog(false)}>
                <MaterialSymbolsCloseIcon />
              </IconButton>
              <Typography variant="h6" sx={{ ml: theme.spacing(1) }}>
                발행 옵션
              </Typography>

              <WT_Post_Form.SubmitButton sx={{ ml: "auto" }} submitErrorHandler={submitErrorHandler} />
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
                  <WT_Post_Form.Thumbnail />
                </Stack>
              )}
              {navValue === "keyword" && (
                <Stack spacing={4}>
                  <WT_Post_Form.CreationType />
                  <WT_Post_Form.Pair />
                  <WT_Post_Form.Keywords />
                </Stack>
              )}
              {navValue === "public" && (
                <Stack spacing={4}>
                  <WT_Post_Form.Age />
                </Stack>
              )}
              {navValue === "notification" && (
                <Stack spacing={4}>
                  <WT_Post_Form.AuthorTalk />
                  <WT_Post_Form.Precaution />
                </Stack>
              )}
            </Grid>
          </Grid>
        </FormDialog.Body>

        {isUpSm && (
          <FormDialog.Footer>
            <WT_Post_Form.SubmitButton submitErrorHandler={submitErrorHandler} />
          </FormDialog.Footer>
        )}
      </FormDialog>
    </>
  );
}
