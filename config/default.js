/**
* Runtime app configuration
* Should not be directly accessed or modified at run time
*/
export default {
	siteMap: [
		{
			label: 'Home',
			path: '/',
			icon: 'icon-home-full',
		},
		{
			label: 'Guide',
			path: '/guide',
			icon: 'icon-book-full',
		},
		{
			label: 'Wall',
			path: '/wall/main',
			icon: 'icon-broadcast',
		},
	],

	categories: ['Main', 'Sci', 'Pol', 'Gov', 'Anim'],
};
