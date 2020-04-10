const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
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
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Translator Go',
    }),
  ],
}
