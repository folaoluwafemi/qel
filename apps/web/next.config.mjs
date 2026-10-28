import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),
  transpilePackages: [
    "@qel/core",
    "@qel/design-system",
    "@qel/visual-stream",
    "@qel/thought-graph",
  ],
};

export default nextConfig;
