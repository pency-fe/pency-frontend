import { ComponentPropsWithRef, forwardRef, useMemo } from "react";
import {
  Avatar,
  AvatarProps,
  Box,
  ButtonBase,
  ButtonBaseProps,
  Card,
  Link,
  LinkProps,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { maxLine } from "@/util";
import { Thumbnail } from "../thumbnail";
import { Label } from "../label";
import NextLink from "next/link";

type Props = {
  slotProps: {
    buttonBase?: ButtonBaseProps;
    thumbnail: ComponentPropsWithRef<typeof Thumbnail>;
    labels?: Array<ComponentPropsWithRef<typeof Label>>;
    profile: {
      avatar: AvatarProps;
      link: LinkProps & ComponentPropsWithRef<typeof NextLink>;
    };
  };
  title: string;
  sx?: SxProps<Theme>;
};

export const OverviewCard = forwardRef<HTMLDivElement, Props>(({ slotProps, title, sx }, ref) => {
  const theme = useTheme();

  const oneLine = useMemo(() => maxLine({ line: 1 }), [theme]);

  return (
    <Card ref={ref} sx={{ width: 1, ...sx }}>
      {/* 카드 버튼 */}
      <ButtonBase
        disableRipple
        {...slotProps.buttonBase}
        sx={{
          position: "absolute",
          inset: 0,
          ...slotProps.buttonBase?.sx,
        }}
      />

      {/* 썸네일 */}
      <Thumbnail {...slotProps.thumbnail} />

      <Box sx={{ px: 1.5, py: 1.5 }}>
        {/* 라벨 */}
        {slotProps.labels && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
            {slotProps.labels.map((labelProps, i) => (
              <Label key={i} variant="soft" {...labelProps} sx={{ height: 20, fontSize: 11, ...labelProps.sx }} />
            ))}
          </Box>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* 아바타 */}
          <Link
            component={NextLink}
            {...slotProps.profile.link}
            sx={{ zIndex: 1, ...slotProps.profile.link.sx }}
            children={<Avatar sx={{ width: 36, height: 36 }} {...slotProps.profile.avatar} />}
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            {/* 타이틀 */}
            <Typography
              variant="subtitle2"
              color="inherit"
              sx={{
                lineHeight: 1,
                ...oneLine,
              }}
            >
              {title}
            </Typography>

            {/* 이름 */}
            <Link
              component={NextLink}
              variant="overline"
              underline="none"
              color={theme.vars.palette.text.secondary}
              {...slotProps.profile.link}
              sx={{
                zIndex: 1,
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
