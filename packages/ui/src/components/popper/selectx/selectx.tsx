"use client";
import {
  ClickAwayListener,
  FormControl,
  Grow,
  InputLabel,
  MenuList,
  Paper,
  Popper,
  PopperProps,
  Select,
  SelectProps,
  useTheme,
} from "@mui/material";
import { useBooleanState } from "@pency/util";
import { Children, cloneElement, isValidElement, MouseEvent, ReactElement, useId, useRef } from "react";
import { getTransformOrigin } from "../get-transform-origin";
import maxSize from "popper-max-size-modifier";

type SelectxProps<Value = unknown> = SelectProps<Value>;

export function Selectx<Value = unknown>({
  label,
  children,
  fullWidth = false,
  multiple = false,
  onChange,
  required,
  value,
  ...rest
}: SelectxProps<Value>) {
  const ref = useRef<HTMLDivElement>(null);
  const open = useBooleanState(false);
  const id = useId();
  const theme = useTheme();

  const handleItemClick = (child: ReactElement) => (event: MouseEvent) => {
    let newValue;

    if (!event.currentTarget.hasAttribute("tabindex")) {
      return;
    }

    if (multiple && Array.isArray(value)) {
      newValue = value.length !== 0 ? [...value] : [];
      const itemIndex = value.indexOf(child.props.value);
      if (itemIndex === -1) {
        newValue.push(child.props.value);
      } else {
        newValue.splice(itemIndex, 1);
      }
    } else {
      newValue = child.props.value;
      open.setFalse();
    }

    if (value !== newValue) {
      if (onChange) {
        const nativeEvent = event.nativeEvent || event;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);

        Object.defineProperty(clonedEvent, "target", {
          writable: true,
          value: { value: newValue, name },
        });
        onChange(clonedEvent, child);
      }
    }
  };

  const items = Children.toArray(children).map((child) => {
    if (!isValidElement(child)) {
      return null;
    }

    let selected;

    if (multiple) {
      if (!Array.isArray(value)) {
        throw new Error("multiple일 때 value prop은 배열이어야 합니다.");
      }
      selected = value.some((v) => areEqualValues(v, child.props.value));
    } else {
      selected = areEqualValues(value, child.props.value);
    }

    return cloneElement(child, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onClick: handleItemClick(child),
      selected,
      value: undefined,
      "data-value": child.props.value,
    });
  });

  return (
    <FormControl fullWidth={fullWidth} required={required} focused={open.bool}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        {...rest}
        ref={ref}
        labelId={id}
        label={label}
        open={false}
        required={required}
        multiple={multiple}
        value={value}
        onOpen={open.setTrue}
      >
        {children}
      </Select>
      <Popper
        open={open.bool}
        anchorEl={ref.current}
        placement="bottom"
        transition
        sx={{ overflow: "auto", borderRadius: 1 }}
        modifiers={modifier}
      >
        {({ TransitionProps, placement }) => (
          <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={open.setFalse}>
            <Grow {...TransitionProps} style={{ transformOrigin: getTransformOrigin(placement) }}>
              <Paper sx={{ p: "4px", boxShadow: theme.vars.customShadows.dropdown }}>
                <MenuList disablePadding>{items}</MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </FormControl>
  );
}

// ----------------------------------------------------------------------

const modifier: PopperProps["modifiers"] = [
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
  maxSize,
  {
    name: "applyMaxSize",
    enabled: true,
    phase: "beforeWrite",
    requires: ["maxSize"],
    fn({ state }) {
      const { height } = state.modifiersData.maxSize;
      if (state.styles.popper) {
        state.styles.popper.maxHeight = height < 256 ? `${height}px` : "256px";
      }
    },
  },
] as const;

// ----------------------------------------------------------------------

function areEqualValues(a: unknown, b: unknown) {
  if (typeof b === "object" && b !== null) {
    return a === b;
  }

  return String(a) === String(b);
}
