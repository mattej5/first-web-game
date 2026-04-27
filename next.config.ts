import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";
import path from "path";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const projectRoot = path.resolve(process.cwd());

const nextConfig: NextConfig = {
  webpack(config) {
    // pnpm walks up the directory tree and finds /Users/vinjones/package.json,
    // causing tailwindcss to be resolved from the home directory instead of
    // the project. Pin module resolution to the project's node_modules first.
    config.resolve.modules = [
      path.join(projectRoot, "node_modules"),
      "node_modules",
    ];
    return config;
  },
};

export default withPWA(nextConfig);
