const merge = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

const mappingHtmlTemplate = () => {
  const arrPugNames = ['index', 'filter', 'registration', 'room', 'sign-in',
    'ui'];
  return arrPugNames.map((name) => new HtmlWebpackPlugin({
    template: `./src/pugTemplates/${name}.pug`,
    filename: `${name}.html`,
    inject: 'body',
  }));
};

module.exports = merge(common, {
  plugins: mappingHtmlTemplate().concat([
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      publicPath: './',
    }),
    new CopyPlugin([
      { from: 'src/favicons', to: 'favicons' },
    ]),
  ]),
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'production',
              reloadAll: true,
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',

        ],
      },
      {
        test: /\.(woff|woff2|svg|ttf|png|jpg)(\?v=\d+\.\d+\.\d+)?$/,
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
  output: {
    path: path.resolve(__dirname, './build'),
    filename: './js/bundle.js',
  },
  mode: 'production',
});
