"use client";

import { Header } from "@pency/ui/layouts";
import { Left } from "./left";
import { Right } from "./right";

export function HomeHeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header slots={{ left: <Left />, right: <Right /> }} />
      {children}
    </>
  );
}
