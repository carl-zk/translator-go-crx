const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  entry: {
    background: './src/chrome/scripts/background.js',
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [],
  },
  optimization: {
    // splitChunks: {
    //   chunks: 'all',
    //   cacheGroups: {
    //     styles: {
    //       name: 'styles',
    //       test: /\.css$/,
    //       chunks: 'all',
    //       enforce: true,
    //     },
    //   },
    // },
    minimize: true,
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
})
