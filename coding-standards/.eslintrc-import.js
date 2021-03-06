module.exports = {
	plugins: [
		'eslint-plugin-import',
	],
	rules: {
		'import/extensions': ['error', 'ignorePackages'],
		'import/no-unresolved': ['error', { ignore: ['^js', '^srcjs', '^state', '^config'] }],
		// 'import/no-extraneous-dependencies': 0,
	}
}
