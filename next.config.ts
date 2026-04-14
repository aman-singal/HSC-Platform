import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "firebase-admin",
    "@google-cloud/firestore",
    "cheerio",
    "canvas",
    "jsdom"
  ]
};

export default nextConfig;
