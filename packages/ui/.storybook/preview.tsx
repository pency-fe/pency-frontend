import React from "react";
import type { Preview } from "@storybook/react";
import "./baseline.css";
import { InitThemeProvider } from "../src/theme/init-theme-provider";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

// export const decorators = [
//   withThemeFromJSXProvider({
//     Provider: InitThemeProvider,
//   }),
// ];

export const decorators = [
  (Story, context) => {
    return (
      <InitThemeProvider>
        <Story {...context} />
      </InitThemeProvider>
    );
  },
];

export default preview;
