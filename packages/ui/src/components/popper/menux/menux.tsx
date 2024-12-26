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
import { paper, varAlpha } from "../../../util";

type MenuxProps = PopperProps & {
  onClose: ClickAwayListenerProps["onClickAway"];
  children?: ReactNode;
};

export const Menux = forwardRef<HTMLDivElement, MenuxProps>(
  ({ open = false, anchorEl, placement = "bottom", onClose, children, modifiers = [], ...rest }, ref) => {
    const theme = useTheme();

    return (
      <Popper
        ref={ref}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        modifiers={[{ name: "preventOverflow", enabled: false }, ...modifiers]}
        {...rest}
      >
        {({ TransitionProps, placement }) => (
          <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={onClose}>
            <Grow {...TransitionProps} style={{ transformOrigin: getTransformOrigin(placement) }}>
              <Paper sx={paper({ theme, dropdown: true })}>
                <MenuList disablePadding>{children}</MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    );
  },
);
