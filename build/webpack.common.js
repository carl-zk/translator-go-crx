const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.ts',
  },
  output: {
    publicPath: '/',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          // {
          //   loader:'style-loader',
          //   options:{injectType:'linkTag'}
          // },
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
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
          // options: {
          //   name: '/assets/[name].[ext]',
          // },
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
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Translator Go',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
}
