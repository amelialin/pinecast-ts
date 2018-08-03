const path = require('path');

const webpack = require('webpack');

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

    const MinifyPlugin = require('babel-minify-webpack-plugin');
    plugins.push(
      new MinifyPlugin({
        mangle: {
          blacklist: ['Buffer'],
        },
      }),
    );
  }

  return {
    devtool: 'source-maps',
    entry: {
      index: './src/index.ts',
    },
    resolve: {
      alias: require('../../webpack.aliases'),
      aliasFields: ['es2017', 'es2015', 'browser'],
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
    mode: env === 'prod' ? 'production' : 'development',
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
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    optimization: {
      minimizer: [],
      splitChunks: false,
    },
    performance: {
      maxAssetSize: 4000000,
    },
    devServer: {
      contentBase: __dirname,
      port: 8001,
      publicPath: '/build/',

      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
    },
    externals: require('../../webpack.externals'),
  };
};
