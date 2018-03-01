const path = require('path');

const webpack = require('webpack');

module.exports = {
  devtool: 'source-maps',
  entry: {
    app: ['./src/server.ts'],
  },
  resolve: {
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
  externals: [
    function(context, request, callback) {
      switch (request) {
        case 'bluebird':
        case 'any-promise':
          return callback(null, 'Promise');
        default:
          if (
            request[0] === '.' ||
            (request.includes('@pinecast') &&
              request.search(/@pinecast\/.*\/node_modules\//) === -1) ||
            (context.includes('packages/components/') && request !== 'react') ||
            (context.includes('packages/styles/') && request !== 'react')
          ) {
            return callback();
          }
          // console.log(context, request);
          return callback(null, request);
      }
    },
  ],
  target: 'node',
  node: {
    Buffer: false,
    setImmediate: false,
    process: false,
  },
};
