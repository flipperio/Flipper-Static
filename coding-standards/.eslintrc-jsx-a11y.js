module.exports = {
	plugins: [
		'eslint-plugin-jsx-a11y'
	],
	rules: {
		'jsx-a11y/anchor-is-valid': [ 'error', {
			'components': [ 'Link' ],
			'specialLink': [ 'to', 'hrefLeft', 'hrefRight' ],
			'aspects': [ 'noHref', 'invalidHref', 'preferButton' ]
		}],
		'jsx-a11y/click-events-have-key-events': 0,
		'jsx-a11y/no-noninteractive-element-interactions': 0,
		'jsx-a11y/no-static-element-interactions': 0,
		'jsx-a11y/anchor-is-valid': 0,
	}
}
