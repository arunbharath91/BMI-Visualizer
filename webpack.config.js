const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
module.exports = {
  entry: ['./src/app/main'],
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: [/node_modules\/rxjs/],
    }, {
      test: /\.scss$/,
      use: [
        "style-loader",
        MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader"
      ]
    }],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new HtmlWebpackPlugin({ // Also generate a test.html
      filename: 'index.html',
      template: 'src/index.html',
      hash: true,
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin([{
        from: 'src/assets',
        to: 'assets',
        ignore: ['*.scss'],
      },
      {
        from: 'src/*.html',
        to: '',
        flatten: true,
        ignore: ['index.html']
      }
    ]),
    new WebpackMd5Hash()
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
