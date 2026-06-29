/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Mantine ships its own tree-shaking, so it's left out of this list. Note that
  // Mantine compound sub-components (List.Item, Table.Thead, …) must be imported
  // flat (e.g. `import { ListItem }`) when used inside a Server Component.
  experimental: {
    optimizePackageImports: ["@tabler/icons-react"],
  },
  // The TinaCMS editor is a static SPA emitted to /public/admin/index.html.
  // Serve it at the clean URL /admin so editors don't have to type index.html.
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
};

export default nextConfig;
