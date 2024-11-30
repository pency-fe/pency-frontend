"use client";

import { ClickAwayListener, ClickAwayListenerProps, Grow, Paper, Popper, PopperProps, useTheme } from "@mui/material";
import { forwardRef } from "react";
import { getTransformOrigin } from "../get-transform-origin";

type PopperxProps = PopperProps & {
  onClose: ClickAwayListenerProps["onClickAway"];
  children?: React.ReactNode;
};

export const Popperx = forwardRef<HTMLDivElement, PopperxProps>(
  ({ open = false, anchorEl, placement = "bottom", onClose, children, modifiers = [], ...rest }, ref) => {
    const theme = useTheme();

    return (
      <Popper
        ref={ref}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        modifiers={[...modifiers]}
        {...rest}
      >
        {({ TransitionProps, placement }) => (
          <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={onClose}>
            <Grow {...TransitionProps} style={{ transformOrigin: getTransformOrigin(placement) }}>
              <Paper sx={{ boxShadow: theme.vars.customShadows.dropdown }}>{children}</Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    );
  },
);
