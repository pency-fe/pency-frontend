import { pxToRem } from "./px-to-rem";

export const mediaQueries = {
  upXs: "@media (min-width:0px)",
  upSm: "@media (min-width:600px)",
  upMd: "@media (min-width:900px)",
  upLg: "@media (min-width:1200px)",
  upXl: "@media (min-width:1536px)",
};

/**
 * Responsive font sizes
 */
export function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
  return {
    [mediaQueries.upSm]: { fontSize: pxToRem(sm) },
    [mediaQueries.upMd]: { fontSize: pxToRem(md) },
    [mediaQueries.upLg]: { fontSize: pxToRem(lg) },
  };
}
