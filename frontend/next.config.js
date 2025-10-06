/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { env } from "process";
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: env.B2_ENDPOINT?.replace("https://", "*") ?? "*",
        pathname: "/**",
      },
    ],
  },
};

export default config;
