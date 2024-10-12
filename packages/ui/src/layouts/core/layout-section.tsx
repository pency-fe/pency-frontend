import { Box, SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { layoutClasses } from "../classes";

type Props = {
  sx?: SxProps<Theme>;
  slots?: {
    headerSection?: React.ReactNode;
    sidebarSection?: React.ReactNode;
    footerSection?: React.ReactNode;
  };
  children?: React.ReactNode;
};

export function LayoutSection({ slots, children }: Props) {
  return (
    <Box id="root__layout" className={layoutClasses.root}>
      {slots?.sidebarSection ? (
        <>
          {slots?.sidebarSection}
          <Box className={layoutClasses.hasSidebar} display="flex" flex="1 1 auto" flexDirection="column">
            {slots?.headerSection}
            {children}
            {slots?.footerSection}
          </Box>
        </>
      ) : (
        <>
          {slots?.headerSection}
          {children}
          {slots?.footerSection}
        </>
      )}
    </Box>
  );
}
