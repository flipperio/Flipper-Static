const defaultConfig = {
	siteMap: {
		home: {
			label: 'Home',
			basePath: '/',
			defaultPath: '/',
			path: '/',
			icon: 'icon-home-full'
		},
		about: {
			label: 'About',
			basePath: '/about',
			defaultPath: '/about',
			path: '/about',
			icon: 'icon-book-full'
		},
		wall: {
			label: 'Wall',
			basePath: '/wall',
			defaultPath: '/wall/main',
			path: '/wall/:category',
			icon: 'icon-broadcast'
		}
	},

	categories: ['Main', 'Sci', 'Pol', 'Gov', 'Anim'],
	formSchema: {
		title: {
			type: 'string',
			minLength: 4,
			maxLength: 46
		},
		body: {
			type: 'string',
			minLength: 12,
			maxLength: 290
		}
	}
};

export default defaultConfig;
