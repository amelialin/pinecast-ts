const path = require('path');

module.exports = env => ({
  devtool: 'source-maps',
  mode: 'production',
  entry: {
    app: ['./src/server.ts'],
  },
  resolve: {
    alias: require('../../webpack.aliases'),
    mainFields: ['main'],
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
        options: {
          transpileOnly: env === 'prod',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: 'null-loader',
      },
    ],
  },
  target: 'node',
  optimization: {
    minimizer: env === 'prod' ? undefined : [],
    splitChunks: false,
  },
  node: {
    Buffer: false,
    setImmediate: false,
    process: false,
  },
});
