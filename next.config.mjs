import createMDX from '@next/mdx'
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below
    images: {
        remotePatterns: [new URL(process.env.NEXT_PUBLIC_SUPABASE_REMOTE_PATTERN)],
    },
}
 
const withMDX = createMDX({
  // Add markdown plugins here, as desired
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)