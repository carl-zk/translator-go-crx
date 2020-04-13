const merge = require('webpack-merge')
const dev = require('./webpack.dev')

module.exports = merge(dev, {
  entry: {
    content: './src/chrome/scripts/content.js',
    background: './src/chrome/scripts/background.js',
  },
})
