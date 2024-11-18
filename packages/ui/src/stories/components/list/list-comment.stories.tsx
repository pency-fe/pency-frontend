import {
  EvaEditOutlineIcon,
  EvaMoreVerticalOutlineIcon,
  ListComment,
  MaterialSymbolsReportOutlineIcon,
  Menux,
  MingcuteDelete3LineIcon,
  TablerPinIcon,
  useMenuxState,
} from "@/components";
import { Box, Divider, Stack } from "@mui/material";
import { formatRelativeTimeFromUTC } from "@pency/util";
import { Meta } from "@storybook/react";

// ----------------------------------------------------------------------

const meta: Meta = {
  title: "components/list/ListComment",
};

export default meta;

// ----------------------------------------------------------------------

const commentData = {
  commentId: "comment-id-123",
  channel: {
    channelId: "channel-id-123",
    avatar: "https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png",
    name: "김천재의 채널",
  },
  label: "구매",
  createdAt: 1730535831,
  comment:
    "넘 재밌어요!! 넘 재밌어요!! 넘 재밌어요!! 넘 재밌어요!! 넘 재밌어요!! 넘 재밌어요!! 넘 재밌어요!! 넘 재밌어요!! 넘 재밌어요!! 넘 재밌어요!!",
  likeCount: 100,
  replyCount: 32,
};

// ----------------------------------------------------------------------

export const Comment = () => {
  const { anchorRef, isOpen, close, toggle } = useMenuxState();

  return (
    <>
      <ListComment
        slots={{
          avatarLink: (
            <ListComment.AvatarLink
              href={`/channel/${commentData.channel.channelId}`}
              slots={{
                avatar: <ListComment.AvatarLink.Avatar src={commentData.channel.avatar} />,
              }}
            />
          ),
          nameLink: (
            <ListComment.NameLink href={`/channel/${commentData.channel.channelId}`}>
              {commentData.channel.name}
            </ListComment.NameLink>
          ),
          label: (
            <ListComment.Label variant="soft" color="info">
              {commentData.label}
            </ListComment.Label>
          ),
          createdAt: <ListComment.CreatedAt>{formatRelativeTimeFromUTC(commentData.createdAt)}</ListComment.CreatedAt>,
          comment: <ListComment.Comment>{commentData.comment}</ListComment.Comment>,
          likeButton: <ListComment.LikeButton>{commentData.likeCount}</ListComment.LikeButton>,
          replyButton: <ListComment.ReplyButton>{commentData.replyCount}</ListComment.ReplyButton>,
          feedbackButton: (
            <>
              <ListComment.FeedbackButton ref={anchorRef} onClick={toggle}>
                <EvaMoreVerticalOutlineIcon />
              </ListComment.FeedbackButton>

              <Menux open={isOpen} anchorEl={anchorRef.current} placement="left-start" onClose={close}>
                <Menux.Item>
                  <Menux.Item.Icon>
                    <TablerPinIcon />
                  </Menux.Item.Icon>
                  고정하기
                </Menux.Item>

                <Menux.Item>
                  <Menux.Item.Icon>
                    <EvaEditOutlineIcon />
                  </Menux.Item.Icon>
                  수정하기
                </Menux.Item>

                <Menux.Item>
                  <Menux.Item.Icon>
                    <MingcuteDelete3LineIcon />
                  </Menux.Item.Icon>
                  삭제하기
                </Menux.Item>

                <Menux.Item>
                  <Menux.Item.Icon>
                    <MaterialSymbolsReportOutlineIcon />
                  </Menux.Item.Icon>
                  신고하기
                </Menux.Item>
              </Menux>
            </>
          ),
        }}
      />
    </>
  );
};

// ----------------------------------------------------------------------

export const Reply = () => {
  const { anchorRef, isOpen, close, toggle } = useMenuxState();

  return (
    <Box sx={{ ml: 5 }}>
      <ListComment
        slots={{
          avatarLink: (
            <ListComment.AvatarLink
              href={`/channel/${commentData.channel.channelId}`}
              slots={{
                avatar: <ListComment.AvatarLink.Avatar src={commentData.channel.avatar} />,
              }}
            />
          ),
          nameLink: (
            <ListComment.NameLink href={`/channel/${commentData.channel.channelId}`}>
              {commentData.channel.name}
            </ListComment.NameLink>
          ),
          label: (
            <ListComment.Label variant="soft" color="info">
              {commentData.label}
            </ListComment.Label>
          ),
          createdAt: <ListComment.CreatedAt>{formatRelativeTimeFromUTC(commentData.createdAt)}</ListComment.CreatedAt>,
          comment: <ListComment.Comment>{commentData.comment}</ListComment.Comment>,
          likeButton: <ListComment.LikeButton>{commentData.likeCount}</ListComment.LikeButton>,
          feedbackButton: (
            <>
              <ListComment.FeedbackButton ref={anchorRef} onClick={toggle}>
                <EvaMoreVerticalOutlineIcon />
              </ListComment.FeedbackButton>

              <Menux open={isOpen} anchorEl={anchorRef.current} placement="left-start" onClose={close}>
                <Menux.Item>
                  <Menux.Item.Icon>
                    <TablerPinIcon />
                  </Menux.Item.Icon>
                  고정하기
                </Menux.Item>

                <Menux.Item>
                  <Menux.Item.Icon>
                    <EvaEditOutlineIcon />
                  </Menux.Item.Icon>
                  수정하기
                </Menux.Item>

                <Menux.Item>
                  <Menux.Item.Icon>
                    <MingcuteDelete3LineIcon />
                  </Menux.Item.Icon>
                  삭제하기
                </Menux.Item>

                <Menux.Item>
                  <Menux.Item.Icon>
                    <MaterialSymbolsReportOutlineIcon />
                  </Menux.Item.Icon>
                  신고하기
                </Menux.Item>
              </Menux>
            </>
          ),
        }}
      />
    </Box>
  );
};

// ----------------------------------------------------------------------

export const CommentWithReply = () => {
  return (
    <Stack spacing={2}>
      <Comment />
      {Array.from({ length: 10 }, () => (
        <>
          <Divider />
          <Reply />
        </>
      ))}
    </Stack>
  );
};
