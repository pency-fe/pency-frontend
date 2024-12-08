import { Chip, chipClasses, ChipProps } from "@mui/material";
import { EvaArrowIosDownwardFillIcon, EvaArrowIosUpwardFillIcon } from "../svg";
import { forwardRef } from "react";

type FilterButtonProps = Omit<ChipProps, "onDelete"> & {
  open: boolean;
  label: ChipProps["label"];
  active?: boolean;
};

export const FilterChip = forwardRef<HTMLDivElement, FilterButtonProps>(
  ({ open, label, active, onClick, ...rest }, ref) => {
    return (
      <Chip
        ref={ref}
        label={label}
        variant="soft"
        {...rest}
        onClick={onClick}
        onDelete={onClick}
        deleteIcon={open ? <EvaArrowIosUpwardFillIcon /> : <EvaArrowIosDownwardFillIcon />}
        sx={{
          borderRadius: 3,
          flexShrink: 0,
          ...(active && {
            [`& .${chipClasses.label}`]: {
              fontWeight: 700,
            },
          }),
          ...rest.sx,
        }}
      />
    );
  },
);
