const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  options: { // <-- Just name those options you want to be TRUE
    colors: true,
    version: true,
    timings: true,
    assets: true
  },
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
        include: [path.join(__dirname, 'src', 'assets', 'css'), path.join(__dirname, 'node_modules')],
      },
      {
        // removed namespace of classnames for now!
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style','css?camelCase&modules&importLoaders=1&localIdentName=[local]!sass?config=sassLoader'),
        include: path.join(__dirname, 'src'),
        exclude: path.join(__dirname, 'src', 'assets')
      },
      {
        test: /\.(eot|otf|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        loader: 'url?limit=100000',
      },
      {
        test: /\.(gif|png|jpg)$/,
        loader: 'url?limit=100000'
      },
    ],
  },
};

module.exports = config;
