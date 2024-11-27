import { generateSEO } from '@lib/utils/seo';

export const metadata = generateSEO('index');

export default function Home() {
	return (
		<>
			<h1>Site</h1>
		</>
	);
}
