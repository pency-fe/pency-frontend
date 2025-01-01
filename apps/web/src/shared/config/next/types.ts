import { ReadonlyURLSearchParams } from "next/navigation";

declare module "next/navigation" {
  export function useSearchParams(): ReadonlyURLSearchParams;
  export function usePathname(): string;
}
