import type { Preview } from "@storybook/react";
import "./baseline.css";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { InitThemeProvider } from "../src";

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

export const decorators = [
  withThemeFromJSXProvider({
    Provider: InitThemeProvider,
  }),
];

export default preview;
