const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const sassPaths = require("bourbon-neat").includePaths.map(
  (sassPath) => "includePaths[]=" + sassPath
).join("&");

module.exports = {
  entry: './src',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['.js', '.scss']
  },
  module: {
    rules: [
      {
        loader: ExtractTextPlugin.extract({
          loader: "css-loader!sass-loader?" + sassPaths
        }),
        test: /\.scss$/
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
}
