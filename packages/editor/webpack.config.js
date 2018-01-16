const path = require('path');

const webpack = require('webpack');

module.exports = {
  devtool: 'source-maps',
  entry: {
    index: './src/index.ts',
  },
  resolve: {
    mainFields: ['ts:main', 'jsnext:main', 'main'],
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'index.js',
    chunkFilename: '[name].chunk.js',
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
    ],
  },
  devServer: {
    contentBase: __dirname,
    port: 8001,
    publicPath: '/build/',
  },
  externals: [
    function(context, request, callback) {
      switch (request) {
        // For Node compatibility
        case 'fs':
        case 'net':
          return callback(null, 'null');
        case 'tty':
          return callback(null, '{isatty:function() {}}');

        case 'bluebird':
        case 'any-promise':
          return callback(null, 'Promise');
        case 'function-bind':
          return callback(null, 'Function.prototype.bind');
        case 'is-array':
        case 'isarray':
          return callback(null, 'Array.isArray');
        case 'is-function':
          return callback(
            null,
            'function(x) {return typeof x === "function";}',
          );
        case 'object.assign':
        case 'object-assign':
          return callback(null, 'Object.assign');
        case 'object-keys':
          return callback(
            null,
            '(function() {var x = Object.keys.bind(Object); x.shim = x; return x;}())',
          );
        default:
          return callback();
      }
    },
  ],
};
