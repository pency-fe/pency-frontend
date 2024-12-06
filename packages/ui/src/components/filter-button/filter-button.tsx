import { Chip, ChipProps } from "@mui/material";
import { useBooleanState } from "@pency/util";
import { EvaArrowIosDownwardFillIcon, EvaArrowIosUpwardFillIcon } from "../svg";

type FilterButtonProps = ChipProps & {
  open: boolean;
  label: string;
};

export const FilterButton = ({ open, label, ...rest }: FilterButtonProps) => {
  return (
    <Chip
      label={label}
      variant="soft"
      {...rest}
      deleteIcon={open ? <EvaArrowIosUpwardFillIcon /> : <EvaArrowIosDownwardFillIcon />}
      sx={{ borderRadius: 3, flexShrink: 0, ...rest.sx }}
    />
  );
};
