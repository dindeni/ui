const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const webpack = require("webpack");

module.exports = merge(common, {
		mode: 'development',
		devServer: {
				host: '0.0.0.0',
			    port:3000,
				publicPath: './src',
				contentBase: path.resolve(__dirname, './src'),
				watchContentBase: true,
				writeToDisk: true,
				compress: true,
		},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.pug'
		}),
		/*new HtmlWebpackPlugin({
			filename: 'index1.html',
			template: './src/index1.pug'
		}),*/
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
		})
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
							{
							loader: MiniCssExtractPlugin.loader,
							options: {
								hmr: process.env.NODE_ENV === 'development',
								reloadAll: true
							}
						},
							"css-loader",
							"postcss-loader",
							"sass-loader"

						]
				},
				/*{
					test: /\.(woff|woff2|svg|ttf|png)(\?v=\d+\.\d+\.\d+)?$/,
					use: {
						loader: "url-loader",
						options: {
							limit: 50000,

						}
					}
				}*/
			]
	},
	//source map
	devtool: 'cheap-module-eval-source-map'
});
