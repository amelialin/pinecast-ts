const path = require('path');

const webpack = require('webpack');

module.exports = {
  devtool: 'source-maps',
  entry: {
    app: ['./src/server.ts'],
  },
  resolve: {
    alias: require('../../webpack.aliases'),
    mainFields: ['jsnext:main', 'main'],
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  cache: false,
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [new webpack.LoaderOptionsPlugin({minimize: true})],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  target: 'node',
  node: {
    Buffer: false,
    setImmediate: false,
    process: false,
  },
};
