const path = require('path');

const webpack = require('webpack');

module.exports = env => {
  const plugins = [new webpack.LoaderOptionsPlugin({minimize: true})];

  if (env === 'prod') {
    console.log('Building as production bundle');
    plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
    );
    plugins.push(new webpack.LoaderOptionsPlugin({minimize: true}));
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

    const MinifyPlugin = require('babel-minify-webpack-plugin');
    plugins.push(
      new MinifyPlugin(
        {
          mangle: {
            blacklist: ['Buffer'],
          },
        },
        {sourceMap: 'source-maps'},
      ),
    );
  }

  return {
    devtool: 'source-maps',
    entry: {
      index: './src/index.ts',
    },
    resolve: {
      alias: require('../../webpack.aliases'),
      extensions: ['.ts', '.tsx', '.js', '.json'],
      mainFields: ['ts:main', 'jsnext:main', 'module', 'main'],
      modules: ['node_modules'],
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: 'index.js',
      chunkFilename: '[name].chunk.js',
    },
    plugins,
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
    externals: require('../../webpack.externals'),
  };
};
