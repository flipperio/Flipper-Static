const path = require('path');

module.exports = {
	mode: 'development',
	entry: './source/js/index.jsx',
	devtool: 'eval-source-map',
	output: {
		path: path.resolve(__dirname, 'dist/js'),
		filename: 'index.js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: '/node_modules',
				loader: 'eslint-loader',
				enforce: 'pre',
				options: {
					failOnError: true,
					fix: true,
				},
			},
			{
				test: /\.jsx?$/,
				exclude: '/node_modules',
				loader: 'babel-loader',
			},
		],
	},
};
