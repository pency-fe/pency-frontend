"use client";

import { IcomoonFreeYoutube2Icon } from "@pency/ui/components";
import { useRouter } from "next/navigation";

export default function Left() {
  const router = useRouter();
  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <IcomoonFreeYoutube2Icon
      onClick={handleHomeClick}
      sx={{ width: "fit-content", height: "24px", overflow: "unset", cursor: "pointer" }}
    />
  );
}
