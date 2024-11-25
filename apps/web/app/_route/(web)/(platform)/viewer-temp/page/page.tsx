"use client";

import {
  Avatar,
  avatarClasses,
  AvatarGroup,
  Box,
  Button,
  Chip,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { EvaEyeOutlineIcon, EvaHeartOutlineIcon, Label, ListItemx, NineteenCircleIcon } from "@pency/ui/components";
import NextLink from "next/link";

// ----------------------------------------------------------------------

export function ViewerTemp() {
  return (
    <Stack spacing={1.5}>
      <Stack spacing={3} sx={{ maxWidth: "700px" }}>
        <Content />
        <PaidPostGuide />
      </Stack>
      <ETC />
      <ChannelAction />
      <PostLikeSummary />
      <PostPrevNext />
    </Stack>
  );

  // ----------------------------------------------------------------------

  function Content() {
    return (
      <Stack spacing={2}>
        <Typography>보기 전 주의사항 추가</Typography>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src="https://upload-os-bbs.hoyolab.com/upload/2024/05/25/214188686/6884dc9e8c400ebb9c6730883c3da557_5350171371894236645.png"
            alt=""
            sx={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              pointerEvents: "none",
            }}
          />
          <Box
            component="img"
            src="https://upload-os-bbs.hoyolab.com/upload/2024/05/25/214188686/606d8eb9aa17b35c0ef28ab45d273b59_602386185357571767.png"
            alt=""
            sx={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              pointerEvents: "none",
            }}
          />
          <Box
            component="img"
            src="https://upload-os-bbs.hoyolab.com/upload/2024/05/25/214188686/aa9426706d297284333d2821a0c01119_2283792266632400649.png"
            alt=""
            sx={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              pointerEvents: "none",
            }}
          />
        </Box>
        <Typography>작가의 말 추가</Typography>
      </Stack>
    );
  }
}

// ----------------------------------------------------------------------

function PaidPostGuide() {
  const theme = useTheme();

  return (
    <Stack spacing={1}>
      <Typography variant="body1" color={theme.vars.palette.text.secondary}>
        이어지는 내용이 궁금하다면?
      </Typography>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          alignItems: "center",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: theme.vars.palette.divider,
          borderRadius: 1.5,
          paddingX: 2.5,
          paddingY: 1.5,
        }}
      >
        <Box sx={{ mr: "auto" }}>
          <Typography variant="h4">100P</Typography>
          <Typography variant="subtitle2">50장</Typography>
        </Box>

        <Button variant="contained">구매하기</Button>
      </Stack>
      <Button
        variant="text"
        sx={{
          width: "fit-content",
          ...theme.typography.body2,
        }}
      >
        여러 회차 선택 구매하기
      </Button>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function ETC() {
  const theme = useTheme();

  return (
    <Stack spacing={1}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <EvaEyeOutlineIcon sx={{ color: theme.vars.palette.text.secondary, fontSize: theme.typography.body2 }} />
        <Typography variant="body2" sx={{ color: theme.vars.palette.text.secondary }}>
          1.1만
        </Typography>
        <Typography variant="body2" sx={{ color: theme.vars.palette.text.secondary }}>
          •
        </Typography>
        <Typography variant="body2" sx={{ color: theme.vars.palette.text.secondary }}>
          23-04-13
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Label variant="soft" color="secondary">
            2차 창작
          </Label>
          <Label variant="soft" color="warning">
            BL
          </Label>
          <Label variant="soft" color="warning">
            액션
          </Label>
        </Box>
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
          {Array.from({ length: 10 }, () => (
            <Chip label="액션" variant="soft" size="small" />
          ))}
        </Box>
      </Box>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function ChannelAction() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.vars.palette.divider,
        borderRadius: 1.5,
        paddingX: 2.5,
        paddingY: 1.5,
      }}
    >
      <Avatar
        component={NextLink}
        href="TODO_채널_이동"
        alt=""
        src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png"
      />
      <Box sx={{ mr: "auto" }}>
        <Link
          component={NextLink}
          href="TODO_채널_이동"
          variant="subtitle1"
          underline="none"
          sx={{ color: theme.vars.palette.text.primary, "&:hover": { color: theme.vars.palette.action.hover } }}
        >
          김천재
        </Link>
        <Typography variant="body2" sx={{ color: theme.vars.palette.text.secondary }}>
          구독자 2천명
        </Typography>
      </Box>
      <Button variant="contained">구독하기</Button>
    </Box>
  );
}

// ----------------------------------------------------------------------

function PostLikeSummary() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.vars.palette.divider,
        borderRadius: 1.5,
        paddingX: 2.5,
        paddingY: 1.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
        <AvatarGroup max={4} sx={{ [`& .${avatarClasses.root}`]: { width: 24, height: 24 } }}>
          <Avatar alt="" src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png" />
          <Avatar alt="" src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png" />
          <Avatar alt="" src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png" />
        </AvatarGroup>
        <Box>
          <Typography variant="body2" color={theme.vars.palette.text.secondary}>
            구매자 50명 중
          </Typography>
          <Typography variant="subtitle1">구매자 42명이 좋아합니다.</Typography>
        </Box>
      </Box>
      <IconButton variant="soft" sx={{ ml: "auto" }}>
        <EvaHeartOutlineIcon />
      </IconButton>
    </Box>
  );
}

// ----------------------------------------------------------------------

function PostPrevNext() {
  const postData = {
    postId: "post-id-123",
    thumbnail:
      "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1",
    age: "NINETEEN",
    // title: "천재 궁수의 스트리밍1 천재 궁수의 스트리밍2 천재 궁수의 스트리밍3 천재 궁수의 스트리밍4",
    title: "천재 궁수의 스트리밍",
    channel: {
      name: "김천재의 채널",
    },
    likeCount: 100,
  };

  return (
    <Stack spacing={1}>
      <ListItemx
        slots={{
          overlayElement: <ListItemx.OverlayAnchor href={`/webtoon/post/${postData.postId}`} />,
          trailingLabel: <ListItemx.TrailingLabel>이전화</ListItemx.TrailingLabel>,
          thumbnail: (
            <ListItemx.Thumbnail
              slots={{
                image: <ListItemx.Thumbnail.Image src={postData.thumbnail} />,
                // image: <ListItemx.Thumbnail.Image src={null} />,
                topEnd: postData.age === "NINETEEN" ? <NineteenCircleIcon fontSize="small" /> : null,
              }}
              sx={{ aspectRatio: "16/9" }}
            />
          ),
          title: <ListItemx.Title>{postData.title}</ListItemx.Title>,
          attribute: (
            <ListItemx.Attribute>
              {postData.channel.name}
              <ListItemx.Attribute.Dot />
              <EvaHeartOutlineIcon />
              {postData.likeCount}
            </ListItemx.Attribute>
          ),
        }}
      />
      <ListItemx
        slots={{
          overlayElement: <ListItemx.OverlayAnchor href={`/webtoon/post/${postData.postId}`} />,
          trailingLabel: <ListItemx.TrailingLabel>다음화</ListItemx.TrailingLabel>,
          thumbnail: (
            <ListItemx.Thumbnail
              slots={{
                image: <ListItemx.Thumbnail.Image src={postData.thumbnail} />,
                // image: <ListItemx.Thumbnail.Image src={null} />,
                topEnd: postData.age === "NINETEEN" ? <NineteenCircleIcon fontSize="small" /> : null,
              }}
              sx={{ aspectRatio: "16/9" }}
            />
          ),
          title: <ListItemx.Title>{postData.title}</ListItemx.Title>,
          attribute: (
            <ListItemx.Attribute>
              {postData.channel.name}
              <ListItemx.Attribute.Dot />
              <EvaHeartOutlineIcon />
              {postData.likeCount}
            </ListItemx.Attribute>
          ),
        }}
      />
    </Stack>
  );
}
