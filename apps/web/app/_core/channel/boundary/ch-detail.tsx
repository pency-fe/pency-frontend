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
import { isClient, useToggle, withAsyncBoundary } from "@pency/util";
import React, { createContext, useContext } from "react";
import { channelKeys } from "../query";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const DetailDataContext = createContext<
  | UseQueryResult<Awaited<ReturnType<Exclude<ReturnType<typeof channelKeys.detail>["queryFn"], undefined>>>>["data"]
  | undefined
>(undefined);

function useDetailData() {
  const context = useContext(DetailDataContext);

  if (!context) throw new Error(`부모로 <DetailProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
}

const DetailProvider = withAsyncBoundary(
  ({ children }: { children?: React.ReactNode }) => {
    const { status, data } = useQuery({
      ...channelKeys.detail({ url: useChannelUrlParam() }),
      throwOnError: true,
    });

    if (status !== "success") {
      return <Loading />;
    }

    return <DetailDataContext.Provider value={data}>{children}</DetailDataContext.Provider>;
  },
  {
    errorBoundary: {
      fallback: <Loading />,
    },
  },
);

function Loading() {
  return <></>;
}

const CH_Detail_Fn = ({ children }: { children?: React.ReactNode }) => {
  // [TODO] 쿼리에서 받아온 데이터 provider, context로 내려보내기
  return <DetailProvider>{children}</DetailProvider>;
};

// ----------------------------------------------------------------------

const BgImageFn = () => {
  const data = useDetailData();

  return (
    <>
      {data.bgImage ? (
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
            src={
              "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1"
            }
            sx={{ position: "absolute", left: 0, top: 0, width: 1, height: 1, objectFit: "cover" }}
          />
        </Box>
      ) : null}
    </>
  );
};

// ----------------------------------------------------------------------

const ImageFn = () => {
  const theme = useTheme();
  const data = useDetailData();

  return (
    <Box
      component="img"
      src={data.image ?? process.env["NEXT_PUBLIC_LOGO"]}
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
  const data = useDetailData();

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
      {data.title}
    </Typography>
  );
};

// ----------------------------------------------------------------------

const AttributeFn = () => {
  const theme = useTheme();
  const data = useDetailData();
  console.log("data: ", data);

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
        href={`/profile/@${data.userProfile.url}`}
        color={theme.vars.palette.text.primary}
        sx={{
          ...maxLine({ line: 1 }),
          "&:hover": { textDecoration: "none" },
        }}
      >
        {data.userProfile.nickname}
      </Link>
      <Typography>•</Typography>
      <Typography sx={{ minWidth: "max-content" }}>구독자 {data.subscriberCount}명</Typography>
      <Typography>•</Typography>
      <Typography sx={{ minWidth: "max-content" }}>포스트 {data.wtPostCount}개</Typography>
    </Box>
  );
};

// ----------------------------------------------------------------------

const DescriptionFn = () => {
  const theme = useTheme();
  const [open, toggle] = useToggle(false);
  const data = useDetailData();

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
          {data.description ?? "채널 정보"}
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

  const channelUrl = useChannelUrlParam();

  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  const data = useDetailData();

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
              src={data.image ?? process.env["NEXT_PUBLIC_LOGO"]}
              sx={{ flexShrink: 0, width: 40, height: 40, borderRadius: 1, overflow: "hidden", objectFit: "cover" }}
            />
            <Stack sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="subtitle1">{data.title}</Typography>
              <Typography variant="caption" color={theme.vars.palette.text.secondary}>
                {data.description}
              </Typography>
            </Stack>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <EvaLink2FillIcon sx={{ fontSize: 24, mx: "8px" }} />
            <Typography variant="body2">{`${isClient() ? window.location.origin : ""}/${channelUrl}`}</Typography>
          </Box>
          {/* 채널 정보_구독자, 포스트 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <EvaInfoOutlineIcon sx={{ fontSize: 24, mx: "8px" }} />
            <Typography variant="body2">
              구독자 {data.subscriberCount}명 • 포스트 {data.wtPostCount}개
            </Typography>
          </Box>
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">크리에이터 정보</Typography>
          <Box
            component={NextLink}
            href={`/profile/@${data.userProfile.url}`}
            sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none" }}
          >
            <Avatar src={data.userProfile.image ?? process.env["NEXT_PUBLIC_AVATAR"]} />
            <Typography variant="subtitle1" color={theme.vars.palette.text.primary}>
              {data.userProfile.nickname}
            </Typography>
          </Box>
        </Stack>
        {data.links.length > 0 && (
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">링크</Typography>
            {data.links.map((link) => (
              <Link
                component={NextLink}
                target="_blank"
                href={`${link.url}`}
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
                {link.linkType === "HOME" && <FluentHome24RegularIcon sx={{ fontSize: 24, mx: "10px" }} />}
                {link.linkType === "TWITTER" && <BrandTwitterIcon sx={{ fontSize: 24, mx: "10px" }} />}
                {link.linkType === "INSTAGRAM" && <BrandInstagramIcon sx={{ fontSize: 24, mx: "10px" }} />}

                <Typography variant="body2" component="span">{`${link}`}</Typography>
              </Link>
            ))}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

type SubscriptionButtonFnProps = ButtonProps;

const SubscriptionButtonFn = (rest: SubscriptionButtonFnProps) => {
  const data = useDetailData();

  // [TODO] 내 채널일 경우, 스튜디오 버튼으로 변경
  return (
    <Button variant="contained" {...rest}>
      {data.subscribed ? "구독중" : "구독"}
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
