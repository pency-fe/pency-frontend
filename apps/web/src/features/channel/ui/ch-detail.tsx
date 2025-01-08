"use client";

import React, { createContext, useContext, useMemo } from "react";
import NextLink from "next/link";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { produce } from "immer";
import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  IconButtonProps,
  Link,
  Skeleton,
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
import { isClient, useToggle, withAsyncBoundary } from "@pency/util";
import { channelKeys } from "@/entities/channel";
import { PickQueryOptionsData } from "@/shared/lib/react-query/types";
import { useChannelUrlParam } from "@/shared/lib/hooks/use-channel-url-param";
import { formatCount } from "@/shared/lib/format/format-count";
import { useChannelMeListContext } from "@/entities/channel-me";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";
import { useSubscribe } from "../model/use-subscribe";
import { useUnsubscribe } from "../model/use-unsubscribe";

type QueryData = PickQueryOptionsData<ReturnType<typeof channelKeys.detail>>;

const DetailContext = createContext<QueryData | undefined>(undefined);

function useDetail() {
  const context = useContext(DetailContext);

  if (!context) throw new Error(`부모로 <ChDetail /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

const ChDetailFn = withAsyncBoundary(
  ({ children }: { children?: React.ReactNode }) => {
    const { data } = useSuspenseQuery(channelKeys.detail({ url: useChannelUrlParam() }));

    return <DetailContext.Provider value={data}>{children}</DetailContext.Provider>;
  },
  {
    errorBoundary: {
      fallback: <Loading />,
    },
    suspense: {
      fallback: <Loading />,
    },
  },
);

function Loading() {
  const theme = useTheme();

  return (
    <>
      <Grid
        container
        sx={{
          gap: 1,
          [theme.breakpoints.up("xs")]: {
            mt: "16px",
            mb: "8px",
          },
          [theme.breakpoints.up("sm")]: {
            mt: "24px",
            mb: "12px",
          },
        }}
      >
        <Grid
          item
          xs
          container
          wrap="nowrap"
          sx={{
            [theme.breakpoints.up("xs")]: {
              gap: 1.5,
            },
            [theme.breakpoints.up("sm")]: {
              gap: 2,
            },
          }}
        >
          <Grid item xs="auto">
            <Skeleton
              sx={{
                [theme.breakpoints.up("xs")]: {
                  width: 68,
                  height: 68,
                },
                [theme.breakpoints.up("sm")]: {
                  width: 96,
                  height: 96,
                },
              }}
            />
          </Grid>

          <Grid item xs sm={false}>
            <Stack
              sx={{
                maxWidth: "600px",
                overflow: "hidden",
                [theme.breakpoints.up("xs")]: {
                  gap: "2px",
                },
                [theme.breakpoints.up("sm")]: {
                  gap: "4px",
                },
              }}
            >
              <Skeleton
                sx={{
                  [theme.breakpoints.up("xs")]: {
                    width: "25%",
                    height: 24,
                  },
                  [theme.breakpoints.up("sm")]: {
                    height: 36,
                  },
                }}
              />
              <Skeleton
                sx={{
                  [theme.breakpoints.up("xs")]: {
                    width: "45%",
                    height: 18,
                  },
                  [theme.breakpoints.up("sm")]: {
                    height: 22,
                  },
                }}
              />
              <Skeleton
                sx={{
                  [theme.breakpoints.up("xs")]: {
                    width: "25%",
                    height: 18,
                  },
                  [theme.breakpoints.up("sm")]: {
                    height: 24,
                  },
                }}
              />
            </Stack>
          </Grid>
        </Grid>

        <Grid item xs={12} sm="auto">
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              ml: "auto",
            }}
          >
            <Skeleton
              sx={{
                [theme.breakpoints.up("xs")]: {
                  width: "100%",
                  height: 36,
                },
                [theme.breakpoints.up("sm")]: {
                  width: 64,
                  height: 36,
                },
              }}
            />
            <Skeleton
              width={36}
              height={36}
              sx={{
                width: 36,
                height: 36,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

// ----------------------------------------------------------------------

const BgImageFn = () => {
  const { bgImage } = useDetail();

  return (
    <>
      {bgImage ? (
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
            src={bgImage ?? ""}
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
  const { image } = useDetail();

  return (
    <Box
      component="img"
      src={image ?? process.env["NEXT_PUBLIC_LOGO"]}
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
  const { title } = useDetail();

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
      {title}
    </Typography>
  );
};

// ----------------------------------------------------------------------

const AttributeFn = () => {
  const theme = useTheme();
  const { userProfile, subscriberCount, wtSeriesCount } = useDetail();

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
        href={`/profile/@${userProfile.url}`}
        underline="none"
        color={theme.vars.palette.text.primary}
        sx={maxLine({ line: 1 })}
      >
        {userProfile.nickname}
      </Link>
      <Typography>•</Typography>
      <Typography sx={{ minWidth: "max-content" }}>구독자 {formatCount(subscriberCount)}명</Typography>
      <Typography>•</Typography>
      <Typography sx={{ minWidth: "max-content" }}>웹툰 {formatCount(wtSeriesCount)}개</Typography>
    </Box>
  );
};

// ----------------------------------------------------------------------

const DescriptionFn = () => {
  const theme = useTheme();
  const [open, toggle] = useToggle(false);
  const { description } = useDetail();

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
          {description ?? "채널 정보"}
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

  const data = useDetail();

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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <EvaInfoOutlineIcon sx={{ fontSize: 24, mx: "8px" }} />
            <Typography variant="body2">
              구독자 {data.subscriberCount}명 • 웹툰 {data.wtSeriesCount}개
            </Typography>
          </Box>
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">크리에이터 정보</Typography>
          <Link
            component={NextLink}
            underline="none"
            href={`/profile/@${data.userProfile.url}`}
            sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
          >
            <Avatar src={data.userProfile.image ?? process.env["NEXT_PUBLIC_AVATAR"]} />
            <Typography component="span" variant="subtitle1" color={theme.vars.palette.text.primary}>
              {data.userProfile.nickname}
            </Typography>
          </Link>
        </Stack>
        {data.links.length > 0 ? (
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">링크</Typography>
            <Links links={data.links} />
          </Stack>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

type LinksProps = {
  links: Exclude<QueryData, undefined>["links"];
};

const LINK_TYPE_ORDER: Array<Exclude<QueryData, undefined>["links"][number]["linkType"]> = [
  "HOME",
  "TWITTER",
  "INSTAGRAM",
] as const;

const Links = ({ links }: LinksProps) => {
  const theme = useTheme();
  return LINK_TYPE_ORDER.map((LINK_TYPE, i) => {
    const link = links.find((link) => link.linkType === LINK_TYPE);
    if (!link) {
      return null;
    }

    return (
      <Link
        key={i}
        component={NextLink}
        underline="none"
        target="_blank"
        href={`${link.url}`}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {link.linkType === "HOME" ? (
          <FluentHome24RegularIcon sx={{ fontSize: 24, mx: "10px", color: theme.vars.palette.text.primary }} />
        ) : null}
        {link.linkType === "TWITTER" ? <BrandTwitterIcon sx={{ fontSize: 24, mx: "10px" }} /> : null}
        {link.linkType === "INSTAGRAM" ? <BrandInstagramIcon sx={{ fontSize: 24, mx: "10px" }} /> : null}

        <Typography variant="body2" component="span">{`${link.url}`}</Typography>
      </Link>
    );
  });
};

// ----------------------------------------------------------------------

type SubscriptionOrStudioButtonFnFnProps = ButtonProps;
const SubscriptionOrStudioButtonFn = (rest: SubscriptionOrStudioButtonFnFnProps) => {
  const channelMeList = useChannelMeListContext();
  const { subscribed, id } = useDetail();

  const channelUrl = useChannelUrlParam();

  const isMyChannel = useMemo(() => {
    if (!channelMeList) {
      return false;
    }

    return channelMeList.some((channel) => channel.url === formatChannelUrl(channelUrl, { prefix: false }));
  }, [channelMeList, channelUrl]);

  const subscribe = useSubscribe();
  const unsubscribe = useUnsubscribe();

  const queryClient = useQueryClient();

  const handleSubscription = () => {
    const setSubscribed = (subscribed: boolean) => {
      queryClient.setQueryData(
        channelKeys.detail({ url: channelUrl }).queryKey,
        (oldData) =>
          oldData &&
          produce(oldData, (draft) => {
            draft.subscribed = subscribed;
            if (subscribed) {
              draft.subscriberCount += 1;
            } else {
              draft.subscriberCount -= 1;
            }
          }),
      );
    };
    if (subscribed) {
      unsubscribe({ id }, () => {
        setSubscribed(false);
      });
    } else {
      subscribe({ id }, () => {
        setSubscribed(true);
      });
    }
  };

  return (
    <>
      {isMyChannel ? (
        <Button LinkComponent={NextLink} href={`/studio/${channelUrl}/dashboard`} variant="contained" {...rest}>
          스튜디오
        </Button>
      ) : (
        <Button variant="contained" {...rest} onClick={handleSubscription}>
          {subscribed ? "구독중" : "구독"}
        </Button>
      )}
    </>
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

export const ChDetail = Object.assign(ChDetailFn, {
  BgImage: BgImageFn,
  Image: ImageFn,
  Title: TitleFn,
  Attribute: AttributeFn,
  Description: DescriptionFn,
  SubscriptionOrStudioButton: SubscriptionOrStudioButtonFn,
  ShareIconButton: ShareIconButtonFn,
});
