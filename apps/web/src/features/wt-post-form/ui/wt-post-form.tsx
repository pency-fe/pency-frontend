"use client";

import { ComponentProps } from "react";
import { Form } from "./form/form";
import { Editor } from "./editor";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../model/form-schema";
import { useToggle } from "@pency/util";
import { Button, dialogClasses, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FormDialog, MaterialSymbolsCloseIcon } from "@pency/ui/components";

const PublishOptionButtonFn = () => {
  const { trigger, getFieldState } = useFormContext<FormSchema>();

  const [isOpen, toggle] = useToggle(false);

  const theme = useTheme();
  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  const handleClick = async () => {
    const names = ["title", "content", "price"] as const;

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
    const names = ["thumbnail", "age", "keywords", "authorTalk", "precaution"] as const;

    for (const name of names) {
      if (errors[name]) {
        document.getElementsByName(name)[0]?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
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

        <FormDialog.Body>
          <Stack spacing={4}>
            <Form.Thumbnail />
            <Form.Age />
            <Form.Keywords />
            <Form.AuthorTalk />
            <Form.Precaution />
          </Stack>
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
  Editor: Editor,
});
