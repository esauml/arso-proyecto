const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './js/index.ts',
  devtool: false,
  mode: 'production',

  optimization: {
    runtimeChunk: 'single',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Proyecto ARSO',
      template: 'views/index.html'
    }),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
};