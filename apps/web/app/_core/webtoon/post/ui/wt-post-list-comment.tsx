import { ListItemIcon, MenuItem } from "@mui/material";
import {
  EvaEditOutlineIcon,
  EvaMoreVerticalOutlineIcon,
  ListComment,
  MaterialSymbolsReportOutlineIcon,
  Menux,
  MingcuteDelete3LineIcon,
  TablerPinIcon,
  useMenuxState,
} from "@pency/ui/components";
import { formatRelativeTimeFromUTC } from "@pency/util";
import { forwardRef } from "react";

type Props = {
  data: {
    commentId: string;
    channel: {
      channelId: string;
      avatar: string;
      name: string;
    };
    label: string;
    createdAt: number;
    comment: string;
    likeCount: number;
    replyCount: number;
  };
};

export const WT_Post_List_Comment = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const { anchorRef, isOpen, close, toggle } = useMenuxState();

  return (
    <ListComment
      ref={ref}
      slots={{
        avatarLink: (
          <ListComment.AvatarLink
            href={`/channel/${data.channel.channelId}`}
            slots={{
              avatar: <ListComment.AvatarLink.Avatar src={data.channel.avatar} />,
            }}
          />
        ),
        nameLink: (
          <ListComment.NameLink href={`/channel/${data.channel.channelId}`}>{data.channel.name}</ListComment.NameLink>
        ),
        label: (
          <ListComment.Label variant="soft" color="info">
            {data.label}
          </ListComment.Label>
        ),
        createdAt: <ListComment.CreatedAt>{formatRelativeTimeFromUTC(data.createdAt)}</ListComment.CreatedAt>,
        comment: <ListComment.Comment>{data.comment}</ListComment.Comment>,
        likeButton: <ListComment.LikeButton>{data.likeCount}</ListComment.LikeButton>,
        replyButton: <ListComment.ReplyButton>{data.replyCount}</ListComment.ReplyButton>,
        feedbackButton: (
          <>
            <ListComment.FeedbackButton ref={anchorRef} onClick={toggle}>
              <EvaMoreVerticalOutlineIcon />
            </ListComment.FeedbackButton>

            <Menux open={isOpen} anchorEl={anchorRef.current} placement="left-start" onClose={close}>
              <MenuItem>
                <ListItemIcon>
                  <TablerPinIcon />
                </ListItemIcon>
                고정하기
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <EvaEditOutlineIcon />
                </ListItemIcon>
                수정하기
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <MingcuteDelete3LineIcon />
                </ListItemIcon>
                삭제하기
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <MaterialSymbolsReportOutlineIcon />
                </ListItemIcon>
                신고하기
              </MenuItem>
            </Menux>
          </>
        ),
      }}
    />
  );
});
