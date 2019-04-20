const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					autoprefixer()
				]
			}
		}),
		new CopyPlugin([
			{from: 'src/fonts', to: 'fonts'},
			{from: 'src/index.html', to: ''}
		])
	],
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: ['pug-loader']
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					"sass-loader"
				]
			}
		]
	},
		output: {
				path: path.resolve(__dirname, './build'),
				filename: 'js/bundle.js'
		},
		mode: 'production',
});
