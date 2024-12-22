"use client";

// ----------------------------------------------------------------------

import NextLink from "next/link";
import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  IconButtonProps,
  Link,
  Stack,
  Typography,
  typographyClasses,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { maxLine } from "@pency/ui/util";
import {
  BrandInstagramIcon,
  BrandTwitterIcon,
  EvaArrowIosForwardFillIcon,
  EvaInfoOutlineIcon,
  EvaLink2FillIcon,
  FluentHome24RegularIcon,
  FluentShare24RegularIcon,
  MaterialSymbolsCloseIcon,
} from "@pency/ui/components";
import { usePathname } from "next/navigation";
import { useChannelUrlParam } from "_hooks";
import { isClient, useToggle } from "@pency/util";
import React from "react";

const CH_Detail_Fn = ({ children }: { children?: React.ReactNode }) => {
  // [TODO] 쿼리에서 받아온 데이터 provider, context로 내려보내기
  return children;
};

// ----------------------------------------------------------------------

const BgImageFn = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 1.5,
        pt: "16.2%",
      }}
    >
      <Box
        component="img"
        src="https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1"
        sx={{ position: "absolute", left: 0, top: 0, width: 1, height: 1, objectFit: "cover" }}
      />
    </Box>
  );
};

// ----------------------------------------------------------------------

const ImageFn = () => {
  const theme = useTheme();

  return (
    <Box
      component="img"
      src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png"
      sx={{
        objectFit: "cover",
        overflow: "hidden",
        [theme.breakpoints.up("xs")]: {
          width: 68,
          height: 68,
          borderRadius: 1,
        },
        [theme.breakpoints.up("sm")]: {
          width: 96,
          height: 96,
          borderRadius: 1.5,
        },
      }}
    />
  );
};

// ----------------------------------------------------------------------

const TitleFn = () => {
  const theme = useTheme();

  return (
    <Typography
      sx={{
        ...maxLine({ line: 1 }),
        [theme.breakpoints.up("xs")]: {
          ...theme.typography.subtitle1,
        },
        [theme.breakpoints.up("sm")]: {
          ...theme.typography.h4,
        },
      }}
    >
      채널명 채널명 채널명 채널명 채널명 채널명 채널명 채널명 채널명 채널명 채널명 채널명
    </Typography>
  );
};

// ----------------------------------------------------------------------

const AttributeFn = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        fontWeight: 400,
        overflow: "hidden",
        color: theme.vars.palette.text.secondary,
        [`& .${typographyClasses.root}`]: {
          [theme.breakpoints.up("xs")]: {
            ...theme.typography.caption,
          },
          [theme.breakpoints.up("sm")]: {
            ...theme.typography.body2,
          },
        },
      }}
    >
      <Link
        component={NextLink}
        href="/profile/${@TODO}git"
        color={theme.vars.palette.text.primary}
        sx={{
          ...maxLine({ line: 1 }),
          "&:hover": { textDecoration: "none" },
        }}
      >
        프로필명프로필명프로필
      </Link>
      <Typography>•</Typography>
      <Typography sx={{ minWidth: "max-content" }}>구독자 8천명</Typography>
      <Typography>•</Typography>
      <Typography sx={{ minWidth: "max-content" }}>포스트 1.1개</Typography>
    </Box>
  );
};

// ----------------------------------------------------------------------

const DescriptionFn = () => {
  const theme = useTheme();
  const [open, toggle] = useToggle(false);

  return (
    <>
      <Box
        onClick={toggle}
        sx={{
          display: "flex",
          alignItems: "center",

          color: theme.vars.palette.text.secondary,
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            ...maxLine({ line: 1 }),
            [theme.breakpoints.up("xs")]: {
              ...theme.typography.caption,
            },
            [theme.breakpoints.up("sm")]: {
              ...theme.typography.body1,
            },
          }}
        >
          ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
          ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ
        </Typography>
        <EvaArrowIosForwardFillIcon />
      </Box>
      <ChannelDetailDialog open={open} onClose={() => toggle(false)} />
    </>
  );
};

// ----------------------------------------------------------------------

type ChannelDetailDialogProps = {
  open: boolean;
  onClose: () => void;
};

function ChannelDetailDialog({ open, onClose }: ChannelDetailDialogProps) {
  const theme = useTheme();
  const pathname = usePathname();

  const channelUrl = useChannelUrlParam();

  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xs" fullScreen={isUpSm ? false : true}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px 16px 6px 16px",
          [theme.breakpoints.up("sm")]: { flexDirection: "row-reverse" },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            [theme.breakpoints.up("sm")]: { ml: "auto" },
          }}
        >
          <MaterialSymbolsCloseIcon />
        </IconButton>
        <Typography variant="h6">채널 정보</Typography>
      </Box>
      <Divider />
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          padding: 2,
          overflow: "hidden",
          wordBreak: "break-all",
        }}
      >
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">채널 정보</Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
            }}
          >
            <Box
              component="img"
              src="https://d3mcojo3jv0dbr.cloudfront.net/2023/02/22/09/42/c9d56c2196642756251024404.jpeg?w=50&h=50&q=65"
              sx={{ flexShrink: 0, width: 40, height: 40, borderRadius: 1, overflow: "hidden", objectFit: "cover" }}
            />
            <Stack>
              <Typography variant="subtitle1">채널명 채널명 채널명 채널명</Typography>
              <Typography variant="caption" color={theme.vars.palette.text.secondary}>
                ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ
              </Typography>
            </Stack>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <EvaLink2FillIcon sx={{ fontSize: 24, mx: "10px" }} />
            <Typography variant="body2">{`${isClient() ? window.location.origin : ""}/${channelUrl}`}</Typography>
          </Box>
          {/* 채널 정보_구독자, 포스트 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <EvaInfoOutlineIcon sx={{ fontSize: 24, mx: "10px" }} />
            <Typography variant="body2">구독자 0명 • 포스트 0개</Typography>
          </Box>
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">크리에이터 정보</Typography>
          <Box
            component={NextLink}
            href={"/profile/${@TODO}"}
            sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none" }}
          >
            <Avatar src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png" />
            <Typography variant="subtitle1" color={theme.vars.palette.text.primary}>
              김천재
            </Typography>
          </Box>
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">링크</Typography>
          <Link
            component={NextLink}
            href={`https://pency.co.kr:3000${pathname}`}
            target="_blank"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
              "&:hover": {
                textDecoration: "none",
              },
            }}
          >
            <FluentHome24RegularIcon sx={{ fontSize: 24, mx: "10px", color: theme.vars.palette.text.primary }} />
            <Typography variant="body2" component="span">{`https://pency.co.kr:3000${pathname}`}</Typography>
          </Link>
          <Link
            component={NextLink}
            target="_blank"
            href={`https://pency.co.kr:3000${pathname}`}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
              "&:hover": {
                textDecoration: "none",
              },
            }}
          >
            <BrandTwitterIcon sx={{ fontSize: 24, mx: "10px" }} />
            <Typography variant="body2" component="span">{`https://pency.co.kr:3000${pathname}`}</Typography>
          </Link>
          <Link
            component={NextLink}
            target="_blank"
            href={`https://pency.co.kr:3000${pathname}`}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
              "&:hover": {
                textDecoration: "none",
              },
            }}
          >
            <BrandInstagramIcon sx={{ fontSize: 24, mx: "10px" }} />
            <Typography variant="body2" component="span">{`https://pency.co.kr:3000${pathname}`}</Typography>
          </Link>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

type SubscriptionButtonFnProps = ButtonProps;

const SubscriptionButtonFn = (rest: SubscriptionButtonFnProps) => {
  return (
    <Button variant="contained" {...rest}>
      구독
    </Button>
  );
};

// ----------------------------------------------------------------------

type ShareIconButtonFnProps = IconButtonProps;

const ShareIconButtonFn = (rest: ShareIconButtonFnProps) => {
  return (
    <IconButton variant="soft" {...rest} sx={{ borderRadius: 1, ...rest.sx }}>
      <FluentShare24RegularIcon />
    </IconButton>
  );
};

// ----------------------------------------------------------------------

export const CH_Detail = Object.assign(CH_Detail_Fn, {
  BgImage: BgImageFn,
  Image: ImageFn,
  Title: TitleFn,
  Attribute: AttributeFn,
  Description: DescriptionFn,
  SubscriptionButton: SubscriptionButtonFn,
  ShareIconButton: ShareIconButtonFn,
});
