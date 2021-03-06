const fs = require('fs');
const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const DEV_SERVER_PORT = 8001;
const DEV_SERVER_PUBLIC_PATH = '/build/';

module.exports = env => {
  const plugins = [];

  if (env === 'prod') {
    console.log('Building as production bundle');
    plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
    );
    plugins.push(new webpack.LoaderOptionsPlugin({minimize: true}));
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  }

  const publicPath =
    env === 'prod'
      ? `https://js.pinecast.net${process.env.PUBLIC_PATH}`
      : `//localhost:${DEV_SERVER_PORT}${DEV_SERVER_PUBLIC_PATH}`;
  console.log(`Using publicPath: ${publicPath}`);

  return {
    devtool: 'source-maps',
    entry: {
      index: './src/index.ts',
    },
    resolve: {
      alias: require('../../webpack.aliases'),
      aliasFields: ['es2017', 'es2015', 'browser'],
      extensions: ['.ts', '.tsx', '.js', '.json'],
      mainFields: ['ts:main', 'jsnext:main', 'module', 'browser', 'main'],
      modules: ['node_modules'],
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath,
      filename: 'index.js',
      chunkFilename: '[name].chunk.js',
    },
    plugins,
    mode: env === 'prod' ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: JSON.parse(fs.readFileSync('../../.babelrc')),
            },
            {loader: 'ts-loader', options: {transpileOnly: env === 'prod'}},
          ],
        },
        {
          test: /\.js$/,
          exclude: env === 'prod' ? undefined : /node_modules/,
          loader: 'babel-loader',
          options: JSON.parse(fs.readFileSync('../../.babelrc')),
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    optimization: {
      minimizer:
        env === 'prod'
          ? [
              new TerserPlugin({
                sourceMap: true,
                terserOptions: {
                  mangle: {
                    reserved: ['Buffer'],
                  },
                },
              }),
            ]
          : [],
      splitChunks: false,
    },
    performance: {
      maxAssetSize: 4000000,
    },
    devServer: {
      contentBase: __dirname,
      port: DEV_SERVER_PORT,
      publicPath: '/build/',

      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
    },
    externals: require('../../webpack.externals'),
  };
};
