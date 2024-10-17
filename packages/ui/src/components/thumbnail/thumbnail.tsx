import { Box, BoxProps, useTheme } from "@mui/material";
import { forwardRef } from "react";
import { LazyLoadImage, LazyLoadImageProps } from "react-lazy-load-image-component";

type Props = { zoom?: boolean } & Omit<BoxProps & LazyLoadImageProps, "children">;

export const Thumbnail = forwardRef<HTMLDivElement, Props>(({ zoom = false, sx, src, alt, ...rest }, ref) => {
  const theme = useTheme();

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
        ...sx,
      }}
      {...rest}
    >
      <Box
        component={LazyLoadImage}
        src={src}
        alt={alt}
        sx={{
          width: 1,
          objectFit: "cover",
          transition: theme.transitions.create("transform", {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(zoom && {
            transform: "scale(1.05)",
          }),
        }}
      />
    </Box>
  );
});
