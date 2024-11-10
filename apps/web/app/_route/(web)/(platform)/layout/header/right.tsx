import { Avatar, IconButton, InputAdornment, inputBaseClasses, Stack, TextField, useTheme } from "@mui/material";
import { IcRoundSearchIcon, MingcuteNotificationLineIcon } from "@pency/ui/components";

export function Right() {
  const theme = useTheme();

  return (
    <Stack flexDirection="row" alignItems="center" spacing={1}>
      <TextField
        variant="filled"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IcRoundSearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          [`& .${inputBaseClasses.root}`]: { height: 36 },
          [`& .${inputBaseClasses.input}`]: { paddingLeft: 1.5, paddingY: 0 },
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        }}
      />

      <IconButton
        sx={{
          [theme.breakpoints.up("sm")]: {
            display: "none",
          },
        }}
      >
        <IcRoundSearchIcon />
      </IconButton>

      <IconButton>
        <MingcuteNotificationLineIcon />
      </IconButton>
      <Avatar
        src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png"
        sx={{ width: 24, height: 24 }}
      />
    </Stack>
  );
}
