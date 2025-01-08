"use client";

import { ListItemIcon, MenuItem, Typography, useTheme } from "@mui/material";
import {
  EvaEyeOutlineIcon,
  EvaMoreVerticalOutlineIcon,
  Menux,
  MingcuteDelete3LineIcon,
  RichCard,
  useMenuxState,
} from "@pency/ui/components";

export const WtPostPurchaseFeedbackButton = () => {
  const { anchorRef, isOpen, close, toggle } = useMenuxState();
  const theme = useTheme();

  return (
    <>
      <RichCard.FeedbackButton ref={anchorRef} onClick={toggle}>
        <EvaMoreVerticalOutlineIcon />
      </RichCard.FeedbackButton>
      <Menux open={isOpen} anchorEl={anchorRef.current} placement="left-start" onClose={close}>
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
    </>
  );
};
