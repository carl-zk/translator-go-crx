const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    compress: true,
    port: 9000,
    writeToDisk: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, Authorization, X-PINGOTHER, Content-Type, Host, Origin',
    },
  },
  plugins: [
    new CopyPlugin([{ from: 'src/chrome/scripts/hot-reload.js', to: '.' }]),
    new CopyPlugin([{ from: 'src/chrome/hot-reload.sh', to: '.' }]),
  ],
})
