"use client";

import {
  Avatar,
  AvatarProps,
  Box,
  BoxProps,
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
  Link,
  LinkProps,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import { forwardRef, ReactElement } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { maxLine } from "@/util";
import { EvaHeartOutlineIcon, MaterialSymbolsChatBubbleOutlineIcon } from "../svg";

// ----------------------------------------------------------------------

type ListCommentFnProps = {
  slots: {
    avatarLink: ReactElement;
    nameLink: ReactElement;
    createdAt: ReactElement;
    comment: ReactElement;
    like: ReactElement;
    reply: ReactElement;
    feedbackButton: ReactElement;
  };
} & BoxProps;

const ListCommentFn = forwardRef<HTMLDivElement, ListCommentFnProps>(({ slots, ...rest }, ref) => {
  const theme = useTheme();

  return (
    <Box ref={ref} {...rest} sx={{ display: "flex", alignItems: "flex-start", gap: 1, width: 1, px: 2 }}>
      {slots.avatarLink}

      <Box sx={{ display: "flex", flexDirection: "column", width: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "6px" }}>
          {slots.nameLink}
          {slots.createdAt}
        </Box>
        {slots.comment}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            {slots.like}
            {slots.reply}
          </Box>

          {slots.feedbackButton}
        </Box>
      </Box>
    </Box>
  );
});

// ----------------------------------------------------------------------

type AvatarLinkFnProps = { slots: { avatar: ReactElement } } & LinkProps & NextLinkProps;

const AvatarLinkFn = forwardRef<HTMLAnchorElement, AvatarLinkFnProps>(({ slots, ...rest }, ref) => {
  return (
    <Link ref={ref} component={NextLink} {...rest} sx={{ ...rest.sx }}>
      {slots.avatar}
    </Link>
  );
});

type AvatarFnProps = AvatarProps;

const AvatarFn = forwardRef<HTMLDivElement, AvatarFnProps>((rest, ref) => {
  return <Avatar ref={ref} {...rest} sx={{ width: 32, height: 32, ...rest.sx }} />;
});

// ----------------------------------------------------------------------

type NameLinkFnProps = LinkProps & NextLinkProps;

const NameLinkFn = forwardRef<HTMLAnchorElement, NameLinkFnProps>((rest, ref) => {
  const theme = useTheme();

  return (
    <Link
      ref={ref}
      component={NextLink}
      variant="overline"
      underline="none"
      color={theme.vars.palette.text.primary}
      {...rest}
      sx={{
        ...theme.typography.subtitle1,
        lineHeight: 1,
        ...maxLine({ line: 1 }),
        ...rest.sx,
      }}
    />
  );
});

// ----------------------------------------------------------------------

type CreatedAtFnProps = TypographyProps;

const CreatedAtFn = forwardRef<HTMLHeadingElement, CreatedAtFnProps>((rest, ref) => {
  const theme = useTheme();

  return (
    <Typography
      ref={ref}
      variant="caption"
      color={theme.vars.palette.text.secondary}
      {...rest}
      // https://mui.com/system/getting-started/the-sx-prop/#passing-the-sx-prop
      sx={[maxLine({ line: 1 }), ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])]}
    />
  );
});

// ----------------------------------------------------------------------

type CommentFnProps = TypographyProps;

const CommentFn = forwardRef<HTMLHeadingElement, CommentFnProps>((rest, ref) => {
  return <Typography ref={ref} variant="caption" {...rest} sx={{ mb: 1, ...rest.sx }} />;
});

// ----------------------------------------------------------------------

type LikeFnProps = ButtonProps;

const LikeFn = forwardRef<HTMLButtonElement, LikeFnProps>((rest, ref) => {
  return (
    <Button variant="text" size="small" startIcon={<EvaHeartOutlineIcon />} ref={ref} {...rest} sx={{ ...rest.sx }} />
  );
});

// ----------------------------------------------------------------------

type ReplyFnProps = ButtonProps;

const ReplyFn = forwardRef<HTMLButtonElement, ReplyFnProps>((rest, ref) => {
  return (
    <Button
      variant="text"
      size="small"
      startIcon={<MaterialSymbolsChatBubbleOutlineIcon />}
      ref={ref}
      {...rest}
      sx={{ ...rest.sx }}
    />
  );
});

// ----------------------------------------------------------------------

type FeedbackButtonFnProps = IconButtonProps;

const FeedbackButtonFn = forwardRef<HTMLButtonElement, FeedbackButtonFnProps>((rest, ref) => {
  return <IconButton ref={ref} {...rest} size="small" sx={{ ...rest.sx }} />;
});

// ----------------------------------------------------------------------
export const ListComment = Object.assign(ListCommentFn, {
  AvatarLink: Object.assign(AvatarLinkFn, {
    Avatar: AvatarFn,
  }),
  NameLink: NameLinkFn,
  CreatedAt: CreatedAtFn,
  Comment: CommentFn,
  Like: LikeFn,
  Reply: ReplyFn,
  FeedbackButton: FeedbackButtonFn,
});
