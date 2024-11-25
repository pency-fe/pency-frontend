"use client";

import { SimpleLayout } from "@pency/ui/layouts";
import { useTheme } from "@mui/material";
import { WT_Post_Create_Form } from "_core/webtoon/post";
import HeaderLeft from "./header-left";
import HeaderRight from "./header-right";

type Props = {
  children: React.ReactNode;
};

export function Header({ children }: Props) {
  const theme = useTheme();

  return (
    <WT_Post_Create_Form>
      <SimpleLayout
        slots={{
          header: (
            <SimpleLayout.Header
              slots={{
                left: <HeaderLeft />,
                right: <HeaderRight />,
              }}
            />
          ),
        }}
        slotProps={{
          container: {
            sx: {
              maxWidth: "740px",
              [theme.breakpoints.up("lg")]: {
                maxWidth: "740px",
              },
            },
          },
        }}
      >
        {children}
      </SimpleLayout>
    </WT_Post_Create_Form>
  );
}
