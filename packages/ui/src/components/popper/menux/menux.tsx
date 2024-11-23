"use client";

import {
  ClickAwayListener,
  ClickAwayListenerProps,
  Grow,
  MenuList,
  Paper,
  Popper,
  PopperProps,
  useTheme,
} from "@mui/material";
import { forwardRef, ReactNode } from "react";
import { getTransformOrigin } from "../get-transform-origin";

type MenuxFnProps = {
  open: PopperProps["open"];
  anchorEl: PopperProps["anchorEl"];
  placement?: PopperProps["placement"];
  onClose: ClickAwayListenerProps["onClickAway"];
  children?: ReactNode;
};

export const Menux = forwardRef<HTMLDivElement, MenuxFnProps>(
  ({ open = false, anchorEl, placement = "bottom", onClose, children }, ref) => {
    const theme = useTheme();

    return (
      <Popper
        ref={ref}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        modifiers={[{ name: "preventOverflow", enabled: false }]}
      >
        {({ TransitionProps, placement }) => (
          <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={onClose}>
            <Grow {...TransitionProps} style={{ transformOrigin: getTransformOrigin(placement) }}>
              <Paper sx={{ p: "4px", boxShadow: theme.vars.customShadows.dropdown }}>
                <MenuList disablePadding>{children}</MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    );
  },
);
