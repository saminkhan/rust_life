const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconHashPlugin = require('favicon-hash-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

module.exports = {
    devtool: 'none',
    entry: './frontend/index.js',
    output: {
        filename: '[name].[contentHash].js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /[\\/]node_modules[\\/]/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    regenerator: true,
                                },
                            ],
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '',
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[contentHash].[ext]',
                        outputPath: 'images',
                    },
                },
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                    },
                },
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery',
            localforage: 'localforage',
            'window.jQuery': 'jquery',
            React: 'react',
            ReactDOM: 'react-dom',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css',
        }),
        new HtmlWebpackPlugin({
            title: 'RustLife',
            favicon: 'frontend/favicon.ico',
            meta: {
                charset: 'utf-8',
                viewport:
                    'width=device-width, initial-scale=1, shrink-to-fit=no',
            },
        }),
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, 'frontend/rust'),
            extraArgs: '--no-typescript',
            outDir: path.resolve(__dirname, 'frontend/pkg'),
        }),
        new FaviconHashPlugin(),
    ],
};
