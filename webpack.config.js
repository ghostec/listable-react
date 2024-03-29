const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const includePaths = [
  require("bourbon-neat").includePaths,
  require("bourbon").includePaths
];


const sassPaths = includePaths.map(
  (sassPath) => "includePaths[]=" + sassPath
).join("&");

const APP_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'build');

module.exports = {
  entry: ['babel-polyfill', APP_DIR],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.scss']
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        include: APP_DIR,
        exclude: /node_modules/,
        query: {
          presets: ['babel-preset-env', 'react'],
          plugins: ['transform-object-rest-spread']
        },
        test: /\.js$/
      },
      {
        loader: ExtractTextPlugin.extract({
          loader: "css-loader!sass-loader?" + sassPaths
        }),
        test: /\.scss$/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 5000 }
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.EnvironmentPlugin([
      "ENV", "apiURL"
    ])
  ],
  devServer: {
    port: 8080,
    contentBase: BUILD_DIR,
    historyApiFallback: true
  }
};
