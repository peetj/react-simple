/*

  PRODUCTION CONFIG file

  v0.1

  This is currently a work in progress. The initial version is just a copy of
  the equivalent 'dev' version. The list of tasks to productionise this file
  should be listed below:

  1. Remove hot loading
  2. Add optimisations
    - Uglification
    - Minification
  3. Add hashing, cache busting
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require ('optimize-css-assets-webpack-plugin');

// ALL Paths here!
var mainPath = path.resolve(__dirname, 'src', 'index.js');
var buildPath = path.resolve(__dirname, 'dist');

var config = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    mainPath
  ],
  output: {
    path: buildPath,
    publicPath: '/site',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    }),
    new ExtractTextPlugin('style.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
        include: [path.join(__dirname, 'src', 'assets', 'css'), path.join(__dirname, 'node_modules')],
      },
      {
        // local scss we namespace class names
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
        loader: 'url?limit=100000',
      },
    ],
  },
};

module.exports = config;
