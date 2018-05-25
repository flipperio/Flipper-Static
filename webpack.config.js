/* eslint-disable no-console */
const webpack = require('webpack');
const path = require('path');
require('dotenv-safe').config();

const plugins = [];
let NODE_ENV_PROP;
let webpackMode;
let devtool;

if (process.env.NODE_ENV === 'production') {
	console.log('Webpack building for production');
	NODE_ENV_PROP = JSON.stringify('production');
	webpackMode = 'production';
	devtool = 'source-map';
}
else {
	console.log('Webpack building for development');
	NODE_ENV_PROP = JSON.stringify('development');
	webpackMode = 'development';
	devtool = 'eval-source-map';
}

const envDefinition = {
	NODE_ENV: NODE_ENV_PROP,
	PRODUCTION_API_URL: JSON.stringify(process.env.PRODUCTION_API_URL),
	DEVELOPMENT_API_URL: JSON.stringify(process.env.DEVELOPMENT_API_URL)
};

plugins.push(new webpack.DefinePlugin({ 'process.env': envDefinition }));
module.exports = {
	mode: webpackMode,
	entry: './source/js/index.jsx',
	devtool,
	plugins,
	output: {
		path: path.resolve(__dirname, 'dist/js/build'),
		filename: 'index.js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
		alias: {
			js: path.resolve(__dirname, 'source/js'),
			config: path.resolve(__dirname, 'source/js/config/config.js'),
			state: path.resolve(__dirname, 'source/js/state')
		}
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
					fix: true
				}
			},
			{
				test: /\.jsx?$/,
				exclude: '/node_modules',
				loader: 'babel-loader'
			}
		]
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		publicPath: '/js/build/',
		port: process.env.DEV_PORT,
		host: '0.0.0.0',
		historyApiFallback: true
	}
};
