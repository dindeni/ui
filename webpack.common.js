const path = require('path');
const webpack = require('webpack');

const config = {
  entry: ['jquery', './src/js/app.js'],
  output: {
    path: path.resolve(__dirname, './src'),
    filename: 'js/bundle.js'
  },
		module: {
				rules: [
					{
						test: /\.js$/, // files ending with .js
						exclude: /node_modules/, // exclude the node_modules directory
						loader: "babel-loader", // use this (babel-core) loader
						query: {
								presets:[
										['@babel/preset-env',
										{
												targets: {
														edge: "17",
														firefox: "60",
														chrome: "67",
														safari: "11.1",
												},
												useBuiltIns: "usage",
										},
								],
								]

						}
				},
					{
						test: /\.(woff|woff2|svg|ttf|png)(\?v=\d+\.\d+\.\d+)?$/,
						use: {
							loader: "url-loader",
							options: {
								limit: 50000,

							}
						}
					}
				]
		},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			"window.$": "jquery"
		})
	],
};

module.exports = config;
