var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev.js');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: config.options.colors || false,
    hash: config.options.hash || false,
    version: config.options.version || false,
    timings: config.options.timings || false,
    assets: config.options.assets || false,
    chunks: config.options.chunks || false,
    modules: config.options.modules || false,
    reasons: config.options.reasons || false,
    children: config.options.children || false,
    source: config.options.source || false,
    errors: config.options.errors || false,
    errorDetails: config.options.errorDetails || false,
    warnings: config.options.warnings || false,
    publicPath: config.options.publicPath || false,
  }
}).listen(3000, '0.0.0.0', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});
