import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Your existing Next.js config options
	pageExtensions: ['js', 'jsx', 'md', 'mdx'],
	images: {
		formats: ['image/webp', 'image/avif'],
	},
};

export default withMDX({
	extension: /\.mdx?$/,
})(nextConfig);
