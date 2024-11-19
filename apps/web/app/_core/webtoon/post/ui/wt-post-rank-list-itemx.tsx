import { forwardRef } from "react";
import { Age } from "../const";
import { EvaHeartOutlineIcon, ListItemx, NineteenCircleIcon } from "@pency/ui/components";

type Props = {
  data: {
    postId: string;
    thumbnail: string;
    age: Age;
    // title: string,
    title: string;
    channel: {
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
        overlayElement: <ListItemx.OverlayAnchor href={`/webtoon/post/${data.postId}`} />,
        thumbnail: (
          <ListItemx.Thumbnail
            slots={{
              image: <ListItemx.Thumbnail.Image src={data.thumbnail} sx={{ aspectRatio: "16/9" }} />,
              topEnd: data.age === "NINETEEN" ? <NineteenCircleIcon fontSize="small" /> : null,
            }}
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
            {data.likeCount}
          </ListItemx.Attribute>
        ),
      }}
    />
  );
});
