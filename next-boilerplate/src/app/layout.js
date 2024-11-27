import './_scss/style.scss';
import Nav from './_components/Nav';
import Footer from './_components/Footer';
import AddExternalScripts from './_components/shared/ExternalScripts';
import { AOSInit } from './_components/shared/AOS';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleTagManager } from '@next/third-parties/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { WebVitals } from '@components/WebVitals';

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<meta httpEquiv="Accept-CH" content="DPR, Width"></meta>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/favicon_io/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="192x192"
					href="/favicon_io/android-chrome-192x192.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="512x512"
					href="/favicon_io/android-chrome-512x512.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon_io/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon_io/favicon-16x16.png"
				/>
				<link rel="icon" href="/favicon_io/favicon.ico" />
				<link rel="manifest" href="/favicon_io/site.webmanifest" />

				<script
					dangerouslySetInnerHTML={{
						__html: `!function(t){function e(){var e=this||self;e.globalThis=e,delete t.prototype._T_}"object"!=typeof globalThis&&(this?e():(t.defineProperty(t.prototype,"_T_",{configurable:!0,get:e}),_T_))}(Object);`,
					}}
				/>
				<GoogleTagManager gtmId="GTM-T76DKCMH" />
				<GoogleAnalytics gaId="G-MVMHPTZWBB" />
			</head>
			<body>
				<WebVitals />
				<ToastContainer />
				<AOSInit />
				<Nav />
				{children}
				<Footer />
				<AddExternalScripts />
			</body>
		</html>
	);
}
