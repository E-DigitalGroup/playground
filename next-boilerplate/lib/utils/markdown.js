import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src', 'app', '_data', 'blob');

export function getPostSlugs() {
	return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getPostBySlug(slug) {
	const realSlug = slug.replace(/\.mdx$/, '');
	const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	const { data, content } = matter(fileContents);

	return {
		slug: realSlug,
		meta: data,
		content,
	};
}

export function getAllPosts(count) {
	const slugs = getPostSlugs();
	const posts = slugs.map((slug) => getPostBySlug(slug));

	posts.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));

	if (typeof count === 'number') {
		return posts.slice(0, count);
	} else {
		return posts;
	}
}
