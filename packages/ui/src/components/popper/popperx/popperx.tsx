"use client";

import {
  ClickAwayListener,
  ClickAwayListenerProps,
  Grow,
  Paper,
  PaperProps,
  Popper,
  PopperProps,
  useTheme,
} from "@mui/material";
import { forwardRef } from "react";
import { getTransformOrigin } from "../get-transform-origin";

type PopperxProps = PopperProps & {
  onClose: ClickAwayListenerProps["onClickAway"];
  children?: React.ReactNode;
  slotProps?: {
    paper?: PaperProps;
  };
};

export const Popperx = forwardRef<HTMLDivElement, PopperxProps>(
  ({ open = false, anchorEl, placement = "bottom", onClose, children, modifiers = [], slotProps, ...rest }, ref) => {
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
        sx={{
          zIndex: 1200,
          ...rest.sx,
        }}
      >
        {({ TransitionProps, placement }) => (
          <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={onClose}>
            <Grow {...TransitionProps} style={{ transformOrigin: getTransformOrigin(placement) }}>
              <Paper
                {...slotProps?.paper}
                sx={{ boxShadow: theme.vars.customShadows.dropdown, ...slotProps?.paper?.sx }}
              >
                {children}
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    );
  },
);
