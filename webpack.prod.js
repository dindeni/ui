const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mappingHtmlTemplate = ()=>{
	const arrPugNames = ['index', 'filter', 'registration', 'room', 'signIn',
		'ui'];
	return arrPugNames.map(name=>{
		return new HtmlWebpackPlugin({
			template: `./src/pugTemplates/${name}.pug`,
			filename: `${name}.html`,
			inject: 'body'
		})
	});
};

module.exports = merge(common, {
	plugins:
		mappingHtmlTemplate().concat([
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "style.css",
			publicPath: './'
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
			{from: 'src/assets/favicons', to: 'favicons'}
		])
	]),
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: ['pug-loader']
			},
			{
				test: /\.scss|css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					"sass-loader"
				]
			},
			{
				test: /\.(woff|woff2|svg|ttf|png|jpg)(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: "file-loader",
					options: {
						outputPath: './files',
						publicPath: './files'
					}
				}
			}
		]
	},
		output: {
				path: path.resolve(__dirname, './build'),
				filename: 'js/bundle.js'
		},
		mode: 'production',
});
