/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Mantine ships its own tree-shaking, so it's left out of this list. Note that
  // Mantine compound sub-components (List.Item, Table.Thead, …) must be imported
  // flat (e.g. `import { ListItem }`) when used inside a Server Component.
  experimental: {
    optimizePackageImports: ["@tabler/icons-react"],
  },
};

export default nextConfig;
