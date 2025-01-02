import { FormDialog, MaterialSymbolsCloseIcon, RadioMenuItem } from "../../../components";
import {
  Button,
  dialogClasses,
  Grid,
  IconButton,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useToggle } from "@pency/util";
import { Meta } from "@storybook/react";

const meta: Meta = {
  title: "components/FormDialog",
};

export default meta;

export const Design1 = () => {
  const theme = useTheme();
  const [bool, toggle] = useToggle(false);

  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Button variant="contained" onClick={() => toggle(true)}>
        발행
      </Button>
      <FormDialog
        open={bool}
        onClose={() => toggle(false)}
        fullWidth
        fullScreen={!isUpSm}
        sx={{
          ...(isUpSm && {
            [`& .${dialogClasses.paper}`]: {
              maxWidth: "700px",
              height: "620px",
              maxHeight: 1,
            },
          }),
        }}
      >
        <FormDialog.Header>
          <Typography sx={{ flex: 1 }} variant="h6">
            발행 옵션
          </Typography>

          <IconButton edge="end" color="inherit" onClick={() => toggle(false)}>
            <MaterialSymbolsCloseIcon />
          </IconButton>
        </FormDialog.Header>

        <FormDialog.Body
          sx={{
            py: 0,
            [theme.breakpoints.up("sm")]: { py: 0 },
          }}
        >
          <Grid container sx={{ width: 1, height: 1 }}>
            <Grid
              item
              xs={3}
              sx={{
                height: 1,
                pr: "20px",
                py: "20px",
                border: 0,
                borderRightWidth: "thin",
                borderStyle: "solid",
                borderColor: theme.vars.palette.divider,
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <RadioGroup>
                <RadioMenuItem value="아이템1">아이템1</RadioMenuItem>
                <RadioMenuItem value="아이템2">아이템2</RadioMenuItem>
                <RadioMenuItem value="아이템3">아이템3</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
                <RadioMenuItem value="아이템4">아이템4</RadioMenuItem>
              </RadioGroup>
            </Grid>

            <Grid
              item
              xs={9}
              sx={{
                height: 1,
                pl: "20px",
                py: "20px",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
              <p>hi2</p>
            </Grid>
          </Grid>
        </FormDialog.Body>

        <FormDialog.Footer>
          <Button type="submit" variant="soft" color="primary" size="medium">
            발행
          </Button>
        </FormDialog.Footer>
      </FormDialog>
    </>
  );
};
