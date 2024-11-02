import { forwardRef } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

/**
 * @description
 * https://icon-sets.iconify.design/fluent/share-24-regular/
 */
export const FluentShare24RegularIcon = forwardRef<SVGSVGElement, SvgIconProps>((rest, ref) => (
  <SvgIcon ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
    <path
      fill="currentColor"
      d="M6.747 4h3.464a.75.75 0 0 1 .102 1.493l-.102.007H6.747a2.25 2.25 0 0 0-2.245 2.095l-.005.155v9.5a2.25 2.25 0 0 0 2.096 2.244l.154.006h9.5a2.25 2.25 0 0 0 2.246-2.096l.005-.154v-.498a.75.75 0 0 1 1.493-.102l.007.102v.498a3.75 3.75 0 0 1-3.551 3.744l-.2.006h-9.5a3.75 3.75 0 0 1-3.745-3.551l-.005-.2v-9.5a3.75 3.75 0 0 1 3.55-3.744zh3.464zm7.754 2.52V3.75a.75.75 0 0 1 1.187-.61l.082.068l5.995 5.75c.28.269.305.7.076.998l-.076.085l-5.995 5.752a.75.75 0 0 1-1.262-.435l-.007-.107v-2.725l-.343.03c-2.4.25-4.7 1.331-6.915 3.26c-.52.453-1.322.025-1.237-.658c.665-5.32 3.447-8.251 8.196-8.619zV3.75zm1.5-1.012V7.25a.75.75 0 0 1-.75.75c-3.873 0-6.274 1.676-7.311 5.157l-.08.278l.353-.237C10.449 11.737 12.799 11 15.25 11a.75.75 0 0 1 .743.649l.007.101v1.743L20.162 9.5z"
    />
  </SvgIcon>
));
