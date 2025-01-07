"use client";

import { ComponentProps } from "react";
import { WtEpisodeRichCard } from "@/entities/wt-episode";
import { ListItemIcon, MenuItem, Typography, useTheme } from "@mui/material";
import { EvaEyeOutlineIcon, Menux, MingcuteDelete3LineIcon } from "@pency/ui/components";

export const WtPostPurchaseMenu: ComponentProps<typeof WtEpisodeRichCard>["Menu"] = ({ ...rest }) => {
  const theme = useTheme();

  return (
    <Menux {...rest}>
      <MenuItem>
        <ListItemIcon>
          <EvaEyeOutlineIcon />
        </ListItemIcon>
        소장본 보기
      </MenuItem>

      <MenuItem>
        <ListItemIcon sx={{ color: theme.vars.palette.error.main }}>
          <MingcuteDelete3LineIcon />
        </ListItemIcon>
        <Typography color={theme.vars.palette.error.main}>구매 목록에서 삭제</Typography>
      </MenuItem>
    </Menux>
  );
};
