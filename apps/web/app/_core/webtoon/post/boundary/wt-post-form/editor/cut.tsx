"use client";

import { DraggableSyntheticListeners } from "@dnd-kit/core";
import {
  Box,
  Button,
  IconButton,
  IconButtonProps,
  Stack,
  StackProps,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Label, NimbusDragDotsIcon, Popperx, usePopperxState } from "@pency/ui/components";
import { maxLine, stylesColorScheme, varAlpha } from "@pency/ui/util";
import { memo, PropsWithoutRef, useEffect, useMemo } from "react";
import { useWTPostFormContext } from "../wt-post-form";
import { useController } from "react-hook-form";

// ----------------------------------------------------------------------

type CutProps = {
  src: string;
  order?: number;
  name?: string;
  listeners?: DraggableSyntheticListeners;
  active?: boolean;
} & PropsWithoutRef<StackProps>;

export const Cut = memo(({ src, order, name, listeners, active = false, ...rest }: CutProps) => {
  const theme = useTheme();

  return (
    <Stack {...rest} sx={{ gap: 1, padding: "5px", ...rest.sx }}>
      <Box
        sx={{
          ...(active && {
            borderRadius: 1,
            outlineWidth: "2px",
            outlineOffset: "2px",
            outlineStyle: "solid",
            outlineColor: theme.vars.palette.primary.main,
          }),
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <Box component="img" src={src} sx={{ objectFit: "cover", aspectRatio: "1" }} />
          <DragDot listeners={listeners} />
        </Box>
      </Box>
      {order && name ? (
        <Typography variant="overline" sx={maxLine({ line: 2 })}>
          <Label variant="soft" color="info" sx={{ mr: 0.5 }}>
            {order}
          </Label>
          {name}
        </Typography>
      ) : null}
    </Stack>
  );
});

// ----------------------------------------------------------------------

type DividerCutProps = PropsWithoutRef<StackProps> & { listeners?: DraggableSyntheticListeners; hidePrice?: boolean };

export const DividerCut = memo(({ listeners, hidePrice = false, ...rest }: DividerCutProps) => {
  const theme = useTheme();

  return (
    <Stack {...rest} sx={{ gap: 1, padding: "5px", ...rest.sx }}>
      <Box
        sx={{
          position: "relative",
          width: 1,
          pt: "100%",
          borderRadius: 1,
          bgcolor: theme.vars.palette.grey["900"],
        }}
      >
        <DragDot listeners={listeners} />
        <Label
          variant="soft"
          color="primary"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            [theme.breakpoints.down("sm")]: { bgcolor: "transparent", fontSize: "0.7rem" },
          }}
        >
          여기부터 유료
        </Label>
      </Box>
      {hidePrice ? null : <Price />}
    </Stack>
  );
});

// ----------------------------------------------------------------------

const Price = memo(() => {
  const { control, watch } = useWTPostFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ control, name: "price" });
  const { paid } = watch("content");
  const { anchorRef, isOpen, close, toggle } = usePopperxState();

  const hasPaid = useMemo(() => paid.length !== 0, [paid]);

  useEffect(() => {
    if (!hasPaid) {
      field.onChange(0);
    }
  }, [hasPaid]);

  return (
    <>
      {hasPaid ? (
        <>
          <Button ref={anchorRef} size="small" variant="soft" color={error ? "error" : "inherit"} onClick={toggle}>
            가격 설정
          </Button>
          <Popperx
            anchorEl={anchorRef.current}
            open={isOpen}
            onClose={close}
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, 6],
                },
              },
            ]}
          >
            <Box sx={{ width: "200px", padding: "16px", pb: "12px" }}>
              <TextField
                {...field}
                variant="filled"
                onChange={(event) => {
                  if (/^\d*$/.test(event.target.value)) {
                    const value = Number(event.target.value);

                    if (value > 500000) {
                      field.onChange(500000);
                    } else if (value < 0) {
                      field.onChange(0);
                    } else {
                      field.onChange(value);
                    }
                  }
                }}
                inputProps={{ inputMode: "numeric" }}
                label="가격 설정"
                required
                disabled={!hasPaid}
                helperText={(() => {
                  if (hasPaid && error) {
                    return error.message;
                  }
                  if (hasPaid && !error) {
                    return "100P 단위로 입력해 주세요.";
                  }
                  if (!hasPaid) {
                    return "유료 분량이 있을 때만 설정할 수 있어요.";
                  }
                })()}
                error={hasPaid && !!error}
              />
            </Box>
          </Popperx>
        </>
      ) : null}
    </>
  );
});

// ----------------------------------------------------------------------

type DragDotFnProps = PropsWithoutRef<IconButtonProps> & {
  listeners?: DraggableSyntheticListeners;
};

const DragDot = memo(({ listeners, ...rest }: DragDotFnProps) => {
  const theme = useTheme();

  return (
    <IconButton
      tabIndex={-1}
      disableRipple
      disableFocusRipple
      disableTouchRipple
      size="small"
      variant="text"
      {...listeners}
      {...rest}
      sx={{
        position: "absolute",
        zIndex: 2,
        top: theme.spacing(0.25),
        right: theme.spacing(0.25),
        bgcolor: varAlpha(theme.vars.palette.grey["800Channel"], 0.6),
        ["&:hover"]: {
          bgcolor: varAlpha(theme.vars.palette.grey["800Channel"], 0.6),
        },
        [stylesColorScheme.light]: {
          color: theme.vars.palette.common.white,
        },
        ...rest.sx,
      }}
    >
      <NimbusDragDotsIcon />
    </IconButton>
  );
});

// ----------------------------------------------------------------------
