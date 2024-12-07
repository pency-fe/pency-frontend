import { Chip, chipClasses, ChipProps } from "@mui/material";
import { EvaArrowIosDownwardFillIcon, EvaArrowIosUpwardFillIcon } from "../svg";

type FilterButtonProps = Omit<ChipProps, "onDelete"> & {
  open: boolean;
  label: string;
  active?: boolean;
};

export const FilterChip = ({ open, label, active, onClick, ...rest }: FilterButtonProps) => {
  return (
    <Chip
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
};
