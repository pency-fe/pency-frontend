import { ReadonlyURLSearchParams } from "next/navigation";

declare module "next/navigation" {
  export function useSearchParams(): ReadonlyURLSearchParams;
  export function usePathname(): string;
  export function useParams<T extends Record<string, string | string[]> = Record<string, string | string[]>>(): T;
}
