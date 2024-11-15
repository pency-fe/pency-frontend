"use client";

import { SimpleLayout } from "@pency/ui/layouts";
import Left from "./left";
import Right from "./right";
import { useTheme } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

export function PostIdLayout({ children }: Props) {
  const theme = useTheme();

  return (
    <SimpleLayout
      slots={{
        header: (
          <SimpleLayout.Header
            slots={{
              left: <Left />,
              right: <Right />,
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
  );
}
