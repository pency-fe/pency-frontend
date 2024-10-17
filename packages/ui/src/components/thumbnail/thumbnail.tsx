import { Box, BoxProps } from "@mui/material";
import { forwardRef } from "react";
import { LazyLoadImage, LazyLoadImageProps } from "react-lazy-load-image-component";

type Props = Omit<BoxProps & LazyLoadImageProps, "children">;

export const Thumbnail = forwardRef<HTMLDivElement, Props>(({ src, alt, ...rest }, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 1,
        overflow: "hidden",
      }}
      {...rest}
    >
      <Box component={LazyLoadImage} src={src} alt={alt} sx={{ width: 1, height: 1, objectFit: "cover" }} />
    </Box>
  );
});
