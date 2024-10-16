"use client";

import { HomeLayout } from "../../layout/home";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <HomeLayout>{children}</HomeLayout>;
}
