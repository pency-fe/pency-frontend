import { ClickAwayListener, ClickAwayListenerProps, Grow, MenuList, Paper, Popper, PopperProps } from "@mui/material";
import { forwardRef, ReactNode } from "react";
import { getTransformOrigin } from "./get-transform-origin";

type MenuxProps = {
  open: PopperProps["open"];
  anchorEl: PopperProps["anchorEl"];
  placement?: PopperProps["placement"];
  onClose: ClickAwayListenerProps["onClickAway"];
  children?: ReactNode;
};

export const Menux = forwardRef<HTMLDivElement, MenuxProps>(
  ({ open, anchorEl, placement = "bottom", onClose, children }, ref) => {
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
              <Paper sx={{ p: "4px" }}>
                <MenuList disablePadding>{children}</MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    );
  },
);
