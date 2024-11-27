const SEO = {
	common: {
		creator: 'E-Digital Group',
		authors: [
			{
				name: 'E-Digital Group',
				url: 'https://www.e-digitalgroup.com/',
			},
		],
		publisher: 'E-Digital Group',
		applicationName: 'E-Digital Group',
		category: 'Software Developmemnt',
		title: 'E-Digital Group | Software Development & Web Solutions',
		description:
			'E-Digital Group provides expert software development, website development, and CMS solutions tailored for businesses of all sizes. Elevate your digital presence with us.',
		keywords:
			'software development, website development, CMS solutions, business apps, E-Digital Group, web development, web design, AI solutions',
		robots: 'index',
	},
	index: {
		url: '/',
		title: 'E-Digital Group | Full-Service Digital Agency',
		description:
			'Welcome to E-Digital Group. We specialize in custom software development, web design, and CMS solutions to help businesses succeed online.',
		keywords:
			'digital agency, software development, website design, CMS, custom solutions, E-Digital Group',
		robots: 'index',
	},

	'terms-and-conditions': {
		url: '/terms-and-conditions',
		title: 'E-Digital Group',
		description: 'Software Developmemnt, Website Development, CMS',
		keywords: 'Software Developmemnt, Website Development, CMS',
		robots: 'index',
	},
	'privacy-policy': {
		url: '/privacy-policy',
		title: 'Privacy Policy | E-Digital Group',
		description:
			"Read E-Digital Group's privacy policy to understand how we protect your data and ensure your privacy.",
		keywords: 'privacy policy, data protection, E-Digital Group',
		robots: 'index',
	},
	contact: {
		url: '/contact',
		title: 'Contact Us | E-Digital Group',
		description:
			"Get in touch with E-Digital Group to discuss your software development, website development, or CMS needs. We're here to help.",
		keywords:
			'contact, get in touch, software development, website development, E-Digital Group',
		robots: 'index',
	},
};

const generateSEO = (page, meta = {}) => {
	const baseSEO = {
		metadataBase: 'https://www.e-digitalgroup.com/',
		applicationName: SEO.common.applicationName,
		category: SEO.common.category,
		authors: SEO.common.authors,
		creator: SEO.common.creator,
		publisher: SEO.common.publisher,
		title: SEO.common.title,
		description: SEO.common.description,
		keywords: SEO.common.keywords,
	};
	if (page !== 'dynamic' && SEO[page]) {
		baseSEO.title = SEO[page].title;
		baseSEO.description = SEO[page].description;
		baseSEO.keywords = SEO[page].keywords;
		baseSEO.robots = SEO[page].robots;
	}

	if (page === 'dynamic') {
		baseSEO.title = meta.title;
		baseSEO.description = meta.summary;
		baseSEO.keywords = meta.title;
		baseSEO.robots = meta.robots;
	}

	return baseSEO;
};

export { generateSEO };
