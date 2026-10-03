import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the project root to this folder so a stray package-lock.json / node_modules
  // in a parent directory (e.g. C:\Users\<name>) is never picked up.
  turbopack: { root: here },
};
export default nextConfig;
