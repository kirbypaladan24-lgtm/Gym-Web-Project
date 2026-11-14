import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* AV Fitness Gym — Phase 1.
     No remote image hosts yet: all imagery is local (brand logo + neutral placeholders).
     When gym photography is supplied, it will live in /public and stay local-first. */

  /* Windows developers often open the dev site via 127.0.0.1 while the dev
     server announces localhost — Next 16 blocks that as cross-origin by
     default, which silently breaks hydration. Allow both hostnames. */
  allowedDevOrigins: ["localhost", "127.0.0.1"],
};

export default nextConfig;
