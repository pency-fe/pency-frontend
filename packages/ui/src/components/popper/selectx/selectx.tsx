import {
  ClickAwayListener,
  FormControl,
  Grow,
  InputLabel,
  MenuList,
  Paper,
  Popper,
  Select,
  SelectProps,
  useTheme,
} from "@mui/material";
import { useBooleanState } from "@pency/util";
import { useId, useRef } from "react";
import { getTransformOrigin } from "../get-transform-origin";

type SelectxProps<Value = unknown> = SelectProps<Value>;

export function Selectx<Value = unknown>({ label, children, fullWidth = false, ...rest }: SelectxProps<Value>) {
  const ref = useRef<HTMLDivElement>(null);
  const open = useBooleanState(false);
  const id = useId();
  const theme = useTheme();

  const handleChange = () => {};

  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select {...rest} ref={ref} labelId={id} label={label} open={false} onOpen={open.setTrue}>
        {children}
      </Select>
      <Popper
        open={open.bool}
        anchorEl={ref.current}
        placement="bottom"
        transition
        modifiers={[
          { name: "preventOverflow", enabled: false },
          {
            name: "sameWidth",
            enabled: true,
            fn: ({ state }) => {
              if (state.styles.popper) {
                state.styles.popper.width = `${state.rects.reference.width}px`;
              }
            },
            phase: "beforeWrite",
            requires: ["computeStyles"],
          },
        ]}
      >
        {({ TransitionProps, placement }) => (
          <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={open.setFalse}>
            <Grow {...TransitionProps} style={{ transformOrigin: getTransformOrigin(placement) }}>
              <Paper sx={{ p: "4px", boxShadow: theme.vars.customShadows.dropdown }}>
                <MenuList disablePadding>{children}</MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </FormControl>
  );
}
