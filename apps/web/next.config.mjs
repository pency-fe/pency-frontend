import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
const withVanillaExtract = createVanillaExtractPlugin({ identifiers: "short" });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

export default withVanillaExtract(nextConfig);
