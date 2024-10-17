import { ComponentPropsWithRef, forwardRef } from "react";
import { Box, Card, SxProps, Typography, useTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { maxLine } from "@/util";
import { Thumbnail } from "../thumbnail";
import { Label } from "../label";

type Props = {
  slotProps?: {
    thumbnail?: ComponentPropsWithRef<typeof Thumbnail>;
    labels?: Array<ComponentPropsWithRef<typeof Label>>;
  };
  title: string;
  sx?: SxProps<Theme>;
};

export const OverviewCard = forwardRef<HTMLDivElement, Props>(({ slotProps, title, sx }, ref) => {
  const theme = useTheme();

  return (
    <Card ref={ref} sx={{ width: 1, ...sx }}>
      {/* 카드 버튼 */}

      {/* 이미지 */}
      <Thumbnail {...slotProps?.thumbnail} />

      <Box sx={{ px: 1.5, py: 1.5 }}>
        {/* 라벨 */}
        {slotProps?.labels && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
            {slotProps.labels.map((labelProps) => (
              <Label variant="soft" sx={{ height: 20, fontSize: 11 }} {...labelProps} />
            ))}
          </Box>
        )}

        {/* 아바타 */}

        {/* 타이틀 */}
        <Typography
          variant="subtitle2"
          color="inherit"
          sx={{
            ...maxLine({ line: 2, persistent: theme.typography.subtitle2 }),
          }}
        >
          {title}
        </Typography>
      </Box>
    </Card>
  );
});
