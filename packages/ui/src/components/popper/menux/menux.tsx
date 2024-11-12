"use client";

import {
  ClickAwayListener,
  ClickAwayListenerProps,
  Grow,
  ListItemIcon,
  listItemIconClasses,
  ListItemIconProps,
  MenuItem,
  MenuItemProps,
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

export const MenuxFn = forwardRef<HTMLDivElement, MenuxFnProps>(
  ({ open, anchorEl, placement = "bottom", onClose, children }, ref) => {
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

// ----------------------------------------------------------------------

type ItemFnProps = MenuItemProps;

const ItemFn = forwardRef<HTMLLIElement, ItemFnProps>((rest, ref) => {
  return (
    <MenuItem
      ref={ref}
      {...rest}
      sx={{
        [`& .${listItemIconClasses.root}`]: {
          minWidth: "30px",
        },
        ...rest.sx,
      }}
    />
  );
});

// ----------------------------------------------------------------------

type IconFnProps = ListItemIconProps;

const IconFn = forwardRef<HTMLDivElement, IconFnProps>((rest, ref) => {
  return (
    <ListItemIcon
      ref={ref}
      {...rest}
      sx={{
        mr: 0,
        "& svg": {
          fontSize: "1.25rem",
        },
        ...rest.sx,
      }}
    />
  );
});

// ----------------------------------------------------------------------
export const Menux = Object.assign(MenuxFn, {
  Item: Object.assign(ItemFn, { Icon: IconFn }),
});
