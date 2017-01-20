const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
  entry: APP_DIR,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  resolve: {
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
    new ExtractTextPlugin('style.css')
  ]
};
