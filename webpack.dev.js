const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

const mappingHtmlTemplate = () => {
  const arrPugNames = ['index', 'filter', 'registration', 'room', 'sign-in',
    'ui-page'];
  return arrPugNames.map((name) => new HtmlWebpackPlugin({
    template: `./src/pugTemplates/${name}.pug`,
    filename: `${path.resolve('./')}/${name}.html`,
    inject: 'body',
  }));
};

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    publicPath: '/',
    contentBase: path.resolve(__dirname, './'),
    compress: true,
  },
  plugins: mappingHtmlTemplate().concat([
    new MiniCssExtractPlugin({
      filename: './style.css',
    }),
  ]),
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',

        ],
      },
      {
        test: /\.(woff|woff2|svg|ttf|png|jpg|webmanifest)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: './files',
            publicPath: './files',
          },
        },
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map',
});
