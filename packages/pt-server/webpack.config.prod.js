const path = require('path');

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
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  target: 'node',
  // externals: require('../../webpack.externals'),
};
