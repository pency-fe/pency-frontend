"use client";

import NextLink from "next/link";
import { Avatar, Box, Button, PaginationItem, Stack } from "@mui/material";
import { ListItemx } from "@pency/ui/components";
import { usePaginationx } from "@pency/ui/hooks";
import { createQueryString } from "@pency/util";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function SubscriptionChannelPage() {
  return (
    <Stack spacing={1.5}>
      {Array.from({ length: 5 }, (_, i) => (
        <>
          <ListItemx
            key={i}
            slots={{
              overlayElement: <ListItemx.OverlayAnchor href={`/TODO_[channelUrl]`} />,
              thumbnail: (
                <ListItemx.Thumbnail
                  slots={{
                    image: (
                      <ListItemx.Thumbnail.Image src="https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1" />
                    ),
                  }}
                  sx={{ aspectRatio: "1/1" }}
                />
              ),
              title: <ListItemx.Title>김천재</ListItemx.Title>,
              attribute: (
                <ListItemx.Attribute>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Avatar
                      src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png"
                      sx={{ width: 20, height: 20 }}
                    />
                    김천재
                  </Box>
                </ListItemx.Attribute>
              ),
              trailing: (
                <ListItemx.Trailing>
                  <Button variant="soft">구독 중</Button>
                </ListItemx.Trailing>
              ),
            }}
          />
        </>
      ))}
      <Box sx={{ margin: "auto", mt: 3 }}>
        <Pagination />
      </Box>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Pagination() {
  const searchParams = useSearchParams();
  const pageParam = useMemo(() => {
    const param = Number(searchParams.get("page"));
    if (param && !isNaN(param) && param >= 1) {
      return param;
    }
    return 1;
  }, [searchParams]);

  const paginations = usePaginationx({ pageCount: 20, currentPage: pageParam });

  return (
    <>
      {paginations.map((pagination) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", `${pagination.page}`);
        return (
          <PaginationItem
            component={NextLink}
            href={`/subscription/channel${createQueryString(params)}`}
            {...pagination}
          />
        );
      })}
    </>
  );
}
