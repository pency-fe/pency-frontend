import { Box, Button, IconButton, useTheme } from "@mui/material";
import {
  EvaArrowIosBackFillIcon,
  EvaArrowIosForwardFillIcon,
  EvaHeartOutlineIcon,
  EvaListOutlineIcon,
  MaterialSymbolsChatBubbleOutlineIcon,
} from "@pency/ui/components";

export function BottomAppBar() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        left: 0,
        height: 48,
        bgcolor: theme.vars.palette.background.default,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 700,
          height: 1,
          margin: "auto",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button startIcon={<EvaHeartOutlineIcon />}>31</Button>
          <Button startIcon={<MaterialSymbolsChatBubbleOutlineIcon />}>5</Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button startIcon={<EvaArrowIosBackFillIcon />}>이전화</Button>
          <IconButton>
            <EvaListOutlineIcon />
          </IconButton>
          <Button endIcon={<EvaArrowIosForwardFillIcon />}>다음화</Button>
        </Box>
      </Box>
    </Box>
  );
}
