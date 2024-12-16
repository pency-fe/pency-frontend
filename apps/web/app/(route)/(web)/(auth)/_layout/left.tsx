"use client";

import { BrandPencyTextLogoIcon } from "@pency/ui/components";
import { useRouter } from "next/navigation";

export default function Left() {
  const router = useRouter();
  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <BrandPencyTextLogoIcon
      onClick={handleHomeClick}
      sx={{ width: "fit-content", height: "24px", overflow: "unset", cursor: "pointer" }}
    />
  );
}
