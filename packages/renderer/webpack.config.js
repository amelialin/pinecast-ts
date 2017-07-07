const path = require('path');

const webpack = require('webpack');


module.exports = {
    devtool: 'source-maps',
    entry: {
        app: ['./src/index.ts'],
    },
    resolve: {
        mainFields: [
            'jsnext:main',
            // 'module',
            'main',
        ],
        modules: [
            'node_modules',
        ],
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    cache: false,
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'index.js',
        libraryTarget: 'commonjs2',
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({minimize: true}),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
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
                        request.includes('@pinecast') && request.search(/@pinecast\/.*\/node_modules\//) === -1 ||
                        context.includes('packages/components/') && request !== 'react'
                    ) {
                        return callback();
                    }
                    // console.log(context, request);
                    return callback(null, request);
            }
        }
    ],
    target: 'node',
    node: {
        Buffer: false,
        setImmediate: false,
        process: false,
    },
};
