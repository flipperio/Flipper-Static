module.exports = {
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		}
	},
	plugins: [
		'eslint-plugin-react',
	],
	rules: {
		'jsx-quotes': 0,
		'react/jsx-indent': [2, 'tab'],
		'react/forbid-prop-types': 0
	}
}
