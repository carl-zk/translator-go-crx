const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.ts',
    content: './src/chrome/scripts/content.js',
    background: './src/chrome/scripts/background.js',
    popup: ['./src/chrome/popup/popup.js', './src/assets/styles/popup.scss'],
    options: [
      './src/chrome/option/options.js',
      './src/assets/styles/options.scss',
    ],
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].[ext]',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules',
      },
      {
        test: /\.png$/,
        include: path.resolve(__dirname, '../src/assets'),
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
      },
      {
        test: /\.handlebars$/,
        use: {
          loader: 'handlebars-loader',
          options: {
            include: path.resolve(__dirname, '../src/assets'),
          },
        },
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              attributes: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Translator Go',
      chunks: ['app'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    new CopyPlugin([
      { from: 'src/assets/images', to: 'images' },
      { from: 'src/chrome/manifest.json', to: '.' },
    ]),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: 'src/chrome/popup/popup.html',
      chunks: [],
      options: {
        attributes: false,
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'options.html',
      template: 'src/chrome/option/options.html',
      chunks: [],
      options: {
        attributes: false,
      },
    }),
  ],
}
