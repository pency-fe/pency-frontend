"use client";

export const NewPostIconButton = () => {
  return (
    <>
      <IconButton
        LinkComponent={NextLink}
        href={`/editor/@${channel.url}/webtoon`}
        variant="soft"
        size="small"
        sx={{ borderRadius: 1, zIndex: 2 }}
      >
        <MingcutePencilLineIcon />
      </IconButton>
      <Dialog>{/* /.... */}</Dialog>
    </>
  );
};
