"use client";

import { Layout } from "@/_route/(platform)/layout";

type Props = {
  children: React.ReactNode;
};

export default function PlatformLayout({ children }: Props) {
  return <Layout>{children}</Layout>;
}
