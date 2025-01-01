import { logout } from "@/entities/@auth";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
  return useMutation<Awaited<ReturnType<typeof logout>>, void, void>({
    mutationFn: logout,
  });
};
