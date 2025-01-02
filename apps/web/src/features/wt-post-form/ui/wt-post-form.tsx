"use client";

import { ComponentProps, useState } from "react";
import { Form } from "./form/form";
import { Editor } from "./editor";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../model/form-schema";
import { objectEntries, objectKeys, useToggle } from "@pency/util";
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

const PublishOptionButtonFn = () => {
  const { trigger, getFieldState } = useFormContext<FormSchema>();

  const [navValue, setNavValue] = useState<NavValue>("publish");

  const [isOpen, toggle] = useToggle(false);

  const theme = useTheme();
  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

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

    toggle(true);
  };

  const submitErrorHandler: ComponentProps<typeof Form.SubmitButton>["submitErrorHandler"] = (errors) => {
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
      <Button variant="contained" size="small" onClick={handleClick}>
        발행
      </Button>
      <FormDialog
        open={isOpen}
        onClose={() => toggle(false)}
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

              <IconButton edge="end" color="inherit" onClick={() => toggle(false)}>
                <MaterialSymbolsCloseIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton color="inherit" onClick={() => toggle(false)}>
                <MaterialSymbolsCloseIcon />
              </IconButton>
              <Typography variant="h6" sx={{ ml: theme.spacing(1) }}>
                발행 옵션
              </Typography>

              <Form.SubmitButton sx={{ ml: "auto" }} submitErrorHandler={submitErrorHandler} />
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
                  overflowY: "scroll",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
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
              sx={{
                [theme.breakpoints.up("sm")]: {
                  height: 1,
                  pl: "20px",
                  py: "20px",
                  overflowY: "scroll",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                },
              }}
            >
              {navValue === "publish" && (
                <Stack spacing={4}>
                  <Form.Thumbnail />
                </Stack>
              )}
              {navValue === "keyword" && (
                <Stack spacing={4}>
                  <Form.CreationType />
                  <Form.Pair />
                  <Form.Keywords />
                </Stack>
              )}
              {navValue === "public" && (
                <Stack spacing={4}>
                  <Form.Age />
                </Stack>
              )}
              {navValue === "notification" && (
                <Stack spacing={4}>
                  <Form.AuthorTalk />
                  <Form.Precaution />
                </Stack>
              )}
            </Grid>
          </Grid>
        </FormDialog.Body>

        {isUpSm && (
          <FormDialog.Footer>
            <Form.SubmitButton submitErrorHandler={submitErrorHandler} />
          </FormDialog.Footer>
        )}
      </FormDialog>
    </>
  );
};

export const WtPostForm = Object.assign((rest: ComponentProps<typeof Form>) => <Form {...rest} />, {
  MoreIconButton: Form.MoreIconButton,
  SaveButton: Form.SaveButton,
  PublishButton: PublishOptionButtonFn,
  Title: Form.Title,
  Genre: Form.Genre,
  Editor: Editor,
});
