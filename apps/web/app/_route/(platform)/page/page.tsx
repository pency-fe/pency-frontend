import Grid from "@mui/material/Unstable_Grid2";
import { BannerSection } from "./sections";

export function Page() {
  return (
    <Grid container spacing={3} disableEqualOverflow>
      <Grid xs={12}>
        <BannerSection />
      </Grid>
    </Grid>
  );
}
