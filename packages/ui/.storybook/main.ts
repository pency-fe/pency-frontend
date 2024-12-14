import type { StorybookConfig } from "@storybook/react-vite";
import { join, dirname, resolve } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-themes"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  env: (config) => ({
    ...config,
    NEXT_PUBLIC_LOGO: "https://dev-s3.pency.co.kr/logo.png",
    NEXT_PUBLIC_TEXT_LOGO: "https://dev-s3.pency.co.kr/text_logo.png",
    NEXT_PUBLIC_AVATAR: "https://dev-s3.pency.co.kr/avatar.png",
  }),
  async viteFinal(config) {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": resolve(dirname(__dirname), "src"),
      };
      config.define = {
        ...config.define,
        "process.env": {},
      };
    }

    return config;
  },
};
export default config;
