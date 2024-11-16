"use client";

import { SimpleLayout } from "@pency/ui/layouts";
import Left from "./left";
import Right from "./right";
import { useTheme } from "@mui/material";
import { WT_Post_Create_Form } from "_core/webtoon/post";

type Props = {
  children: React.ReactNode;
};

export function PostIdLayout({ children }: Props) {
  const theme = useTheme();

  return (
    <WT_Post_Create_Form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
      </form>
    </WT_Post_Create_Form>
  );
}
