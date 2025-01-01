import { useMutation } from "@tanstack/react-query";
import { logout } from "@/entities/@auth";

export const useLogout = () => {
  return useMutation<Awaited<ReturnType<typeof logout>>, void, void>({
    mutationFn: logout,
  });
};
