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
		alias: {
			config: path.resolve(__dirname, 'config/config.js'),
			state: path.resolve(__dirname, 'source/js/state'),
		},
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
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		publicPath: '/js/',
		port: 8080,
		host: '0.0.0.0',
		historyApiFallback: true,
	},
};
