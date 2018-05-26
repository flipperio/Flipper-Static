const defaultConfig = {
	siteMap: {
		// home: {
		// 	label: 'Home',
		// 	defaultPath: '/',
		// 	path: '/',
		// 	icon: 'icon-home-full'
		// },
		// guide: {
		// 	label: 'Guide',
		// 	defaultPath: '/guide',
		// 	path: '/guide',
		// 	icon: 'icon-book-full'
		// },
		wall: {
			label: 'Wall',
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
