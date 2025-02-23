import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Content-Security-Policy",
          value: [
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data:",
            "font-src 'self'",
            "object-src 'none'",
            "base-uri 'self'",
          ].join("; "),
        },
      ],
    },
  ],

  webpack(config, { isServer }) {
    if (!isServer) {
      config.optimization.minimize = true;
    }
    return config;
  },
  productionBrowserSourceMaps: false,
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/login",
        permanent: false,
        has: [{ type: "cookie", key: "authenticated", value: "false" }],
      },
    ];
  },
};

export default nextConfig;
