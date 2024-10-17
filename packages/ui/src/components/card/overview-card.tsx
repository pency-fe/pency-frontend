import { ComponentPropsWithRef, forwardRef, useMemo } from "react";
import {
  Avatar,
  AvatarProps,
  Box,
  ButtonBase,
  ButtonBaseProps,
  Card,
  CardProps,
  Link,
  LinkProps,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import { maxLine } from "@/util";
import { Thumbnail } from "../thumbnail";
import { Label } from "../label";
import NextLink from "next/link";
import { useBooleanState } from "@pency/util";

type Props = {
  slotProps: {
    overlay: ButtonBaseProps<"a"> & ButtonBaseProps<"button">;
    thumbnail: ComponentPropsWithRef<typeof Thumbnail>;
    labels?: Array<ComponentPropsWithRef<typeof Label>>;
    title: TypographyProps;
    profile: {
      avatar: AvatarProps;
      link: LinkProps & ComponentPropsWithRef<typeof NextLink>;
    };
  };
} & CardProps;

export const OverviewCard = forwardRef<HTMLDivElement, Props>(({ slotProps, ...rest }, ref) => {
  const theme = useTheme();
  const hover = useBooleanState(false);

  const oneLine = useMemo(() => maxLine({ line: 1 }), [theme]);

  return (
    <Card
      ref={ref}
      {...rest}
      sx={{ width: 1, ...rest.sx }}
      onPointerEnter={hover.setTrue}
      onPointerLeave={hover.setFalse}
    >
      {/* 카드 버튼 */}
      <ButtonBase
        LinkComponent={NextLink}
        disableRipple
        {...slotProps.overlay}
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          ...slotProps.overlay.sx,
        }}
      />

      {/* 썸네일 */}
      <Thumbnail {...slotProps.thumbnail} zoom={hover.bool} />

      <Box sx={{ px: 1.5, py: 1.5 }}>
        {/* 라벨 */}
        {slotProps.labels && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
            {slotProps.labels.map((labelProps, i) => (
              <Label key={i} variant="soft" {...labelProps} />
            ))}
          </Box>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* 아바타 */}
          <Link
            component={NextLink}
            {...slotProps.profile.link}
            sx={{ zIndex: 2, ...slotProps.profile.link.sx }}
            children={
              <Avatar {...slotProps.profile.avatar} sx={{ width: 36, height: 36, ...slotProps.profile.avatar.sx }} />
            }
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            {/* 타이틀 */}
            <Typography
              variant="subtitle2"
              color="inherit"
              {...slotProps.title}
              sx={{
                lineHeight: 1,
                ...oneLine,
                ...slotProps.title.sx,
              }}
            />

            {/* 이름 */}
            <Link
              component={NextLink}
              variant="overline"
              underline="none"
              color={theme.vars.palette.text.secondary}
              {...slotProps.profile.link}
              sx={{
                zIndex: 2,
                lineHeight: 1,
                transition: theme.transitions.create(["color"], {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.shorter,
                }),
                ...oneLine,
                ["&:hover"]: {
                  color: theme.vars.palette.text.primary,
                },
                ...slotProps.profile.link.sx,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
});
