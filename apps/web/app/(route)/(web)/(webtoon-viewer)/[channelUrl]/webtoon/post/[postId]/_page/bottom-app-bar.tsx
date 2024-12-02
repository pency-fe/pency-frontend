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
          padding: "12px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button startIcon={<EvaHeartOutlineIcon />}>31</Button>
          <Button startIcon={<MaterialSymbolsChatBubbleOutlineIcon />}>5</Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button startIcon={<EvaArrowIosBackFillIcon />} sx={{ [theme.breakpoints.down("sm")]: { display: "none" } }}>
            이전화
          </Button>
          <IconButton sx={{ [theme.breakpoints.up("sm")]: { display: "none" } }}>
            <EvaArrowIosBackFillIcon />
          </IconButton>

          <IconButton>
            <EvaListOutlineIcon />
          </IconButton>

          <IconButton sx={{ [theme.breakpoints.up("sm")]: { display: "none" } }}>
            <EvaArrowIosForwardFillIcon />
          </IconButton>
          <Button endIcon={<EvaArrowIosForwardFillIcon />} sx={{ [theme.breakpoints.down("sm")]: { display: "none" } }}>
            다음화
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
