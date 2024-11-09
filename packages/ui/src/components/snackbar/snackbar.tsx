"use client";

import Portal from "@mui/material/Portal";

import { StyledToaster } from "./styles";
import { toasterClasses } from "./classes";
import {
  SolarCheckCircleBoldIcon,
  SolarDangerBoldIcon,
  SolarDangerTriangleBoldIcon,
  SolarInfoCircleBoldIcon,
} from "../svg";

// ----------------------------------------------------------------------

export function Snackbar() {
  return (
    <Portal>
      <StyledToaster
        expand
        gap={12}
        closeButton
        offset={16}
        visibleToasts={4}
        duration={1000000}
        position="bottom-center"
        className={toasterClasses.root}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: toasterClasses.toast,
            icon: toasterClasses.icon,
            // content
            content: toasterClasses.content,
            title: toasterClasses.title,
            description: toasterClasses.description,
            // button
            actionButton: toasterClasses.actionButton,
            cancelButton: toasterClasses.cancelButton,
            closeButton: toasterClasses.closeButton,
            // state
            default: toasterClasses.default,
            info: toasterClasses.info,
            error: toasterClasses.error,
            success: toasterClasses.success,
            warning: toasterClasses.warning,
          },
        }}
        icons={{
          loading: <span className={toasterClasses.loadingIcon} />,
          info: <SolarInfoCircleBoldIcon className={toasterClasses.iconSvg} />,
          success: <SolarCheckCircleBoldIcon className={toasterClasses.iconSvg} />,
          warning: <SolarDangerTriangleBoldIcon className={toasterClasses.iconSvg} />,
          error: <SolarDangerBoldIcon className={toasterClasses.iconSvg} />,
        }}
      />
    </Portal>
  );
}
