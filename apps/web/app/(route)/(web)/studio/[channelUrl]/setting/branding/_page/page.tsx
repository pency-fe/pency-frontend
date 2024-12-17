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

  /**
   * useQuery 사용해서 channelMeKeys.brandingDetail 데이터를 가져와야 한다.
   * 가져온 데이터 적절하게 배채한다.
   * wt-post-page-content.tsx 참고
   * CH_Update_Form.DeleteButton 기능 구현
   * CH_Update_Form.UpdateSubmitButton 기능 구현
   *
   */

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
