'use client';

import { useEffect } from 'react';

function AddExternalScripts() {
	useEffect(() => {
		function setNavHighlight() {
			const navLinks = document.querySelectorAll('.nav-link');
			const currentPathSplit = window.location.pathname.split('/');
			navLinks.forEach((link) => {
				link.getAttribute('href') === `/${currentPathSplit[1]}`
					? link.classList.add('active')
					: link.classList.remove('active');
			});
		}
		import('bootstrap/dist/js/bootstrap.bundle.min.js');
		import('aos/dist/aos.js');
		setNavHighlight();
	}, []);

	return null;
}

export default AddExternalScripts;
