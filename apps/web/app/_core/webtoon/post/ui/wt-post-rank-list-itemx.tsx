import { forwardRef } from "react";
import { Age } from "../const";
import { EvaHeartOutlineIcon, ListItemx, NineteenCircleIcon } from "@pency/ui/components";
import { formatCount } from "@pency/util";

type Props = {
  data: {
    id: number;
    thumbnail: string;
    age: Age;
    title: string;
    channel: {
      channelUrl: string;
      name: string;
    };
    likeCount: number;
  };
};

export const WT_Post_Rank_List_Itemx = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  return (
    <ListItemx
      ref={ref}
      slots={{
        overlayElement: <ListItemx.OverlayAnchor href={`/@${data.channel.channelUrl}/webtoon/post/${data.id}`} />,
        thumbnail: (
          <ListItemx.Thumbnail
            slots={{
              image: <ListItemx.Thumbnail.Image src={data.thumbnail} />,
              topEnd: data.age === "NINETEEN" ? <NineteenCircleIcon fontSize="small" /> : null,
            }}
            sx={{ aspectRatio: "16/9" }}
          />
        ),
        order: (
          <ListItemx.Order variant="soft" color="info">
            1
          </ListItemx.Order>
        ),
        title: <ListItemx.Title>{data.title}</ListItemx.Title>,
        attribute: (
          <ListItemx.Attribute>
            {data.channel.name}
            <ListItemx.Attribute.Dot />
            <EvaHeartOutlineIcon />
            {formatCount(data.likeCount)}
          </ListItemx.Attribute>
        ),
      }}
    />
  );
});
