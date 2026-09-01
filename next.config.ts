import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const assetPrefix = '/iisit-student-journey';

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: 'export',
      assetPrefix,
      trailingSlash: true,
      images: {
        unoptimized: true,
      },
    }
  : {};

export default nextConfig;
