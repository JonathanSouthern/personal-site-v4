import type { NextConfig } from "next";

// Watch content/ with Velite during dev; production builds run `velite`
// first via the build script, so kicking it off here would race the compiler.
const isDev = process.argv.includes("dev");
if (!process.env.VELITE_STARTED && isDev) {
  process.env.VELITE_STARTED = "1";
  import("velite").then((m) => m.build({ watch: true, clean: false }));
}

const nextConfig: NextConfig = {};

export default nextConfig;
