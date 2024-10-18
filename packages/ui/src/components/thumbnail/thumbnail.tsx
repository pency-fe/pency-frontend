import { Box, BoxProps, useTheme } from "@mui/material";
import { forwardRef } from "react";
import { LazyLoadImage, LazyLoadImageProps } from "react-lazy-load-image-component";

type Props = {
  zoom?: boolean;
  slotProps: {
    image: Omit<BoxProps & LazyLoadImageProps, "children">;
  };
} & BoxProps;

export const Thumbnail = forwardRef<HTMLDivElement, Props>(({ zoom = false, slotProps, ...rest }, ref) => {
  const theme = useTheme();

  return (
    <Box
      ref={ref}
      {...rest}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 1,
        overflow: "hidden",
        ...rest.sx,
      }}
    >
      <Box
        component={LazyLoadImage}
        {...slotProps.image}
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
          ...slotProps.image.sx,
        }}
      />
    </Box>
  );
});
