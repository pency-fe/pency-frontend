"use client";

import { Box, Stack, Typography } from "@mui/material";
import { isClient, useFirstMountState } from "@pency/util";
import { CH_Update_Form } from "_core/channel";
import { useUserAuthMeContext } from "_core/user";
import { redirect, useRouter } from "next/navigation";

// ----------------------------------------------------------------------

export default function SettingBrandingPage() {
  const router = useRouter();
  const me = useUserAuthMeContext();
  const isFirstMount = useFirstMountState();

  if (isFirstMount && !me.isLoggedIn) {
    if (isClient()) {
      router.push("/login");
    } else {
      redirect("/login");
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      noValidate
    >
      <Stack spacing={3}>
        <CH_Update_Form>
          <Stack spacing={4}>
            <Typography variant="h4">채널 정보 수정</Typography>
            <CH_Update_Form.Title variant="filled" />
            <CH_Update_Form.Description variant="filled" />
            <CH_Update_Form.Url variant="filled" />
            <CH_Update_Form.Image />
          </Stack>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
            <CH_Update_Form.DeleteButton />
            <CH_Update_Form.UpdateSubmitButton />
          </Box>
        </CH_Update_Form>
      </Stack>
    </form>
  );
}
