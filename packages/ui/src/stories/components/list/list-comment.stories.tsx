import { EvaMoreVerticalOutlineIcon, ListComment } from "@/components";
import { formatRelativeTimeFromUTC } from "@pency/util";
import { Meta } from "@storybook/react";

const meta: Meta = {
  title: "components/list/ListComment",
};

export default meta;

const commentData = {
  commentId: "comment-id-123",
  channel: {
    channelId: "channel-id-123",
    avatar: "https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png",
    name: "김천재의 채널",
  },
  createdAt: 1730535831,
  comment:
    "넘 재밌어요!! 넘 재밌어요!! 넘 재밌어요!! 넘 재밌어요!! 넘 재밌어요!! 넘 재밌어요!! 넘 재밌어요!! 넘 재밌어요!! 넘 재밌어요!! 넘 재밌어요!!",
  likeCount: 100,
  replyCount: 32,
};

export const Default = () => {
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
          createdAt: <ListComment.CreatedAt>{formatRelativeTimeFromUTC(commentData.createdAt)}</ListComment.CreatedAt>,
          comment: <ListComment.Comment>{commentData.comment}</ListComment.Comment>,
          likeButton: <ListComment.LikeButton>{commentData.likeCount}</ListComment.LikeButton>,
          replyButton: <ListComment.ReplyButton>{commentData.replyCount}</ListComment.ReplyButton>,
          feedbackButton: (
            <ListComment.FeedbackButton>
              <EvaMoreVerticalOutlineIcon />
            </ListComment.FeedbackButton>
          ),
        }}
      />
    </>
  );
};
