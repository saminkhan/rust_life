const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

const APP_NAME = 'FirstRust';

module.exports = {
    mode: 'development',
    entry: './frontend/index.js',
    output: {
        filename: 'bundle.js',
        publicPath: 'static/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: APP_NAME,
            filename: APP_NAME + '.jinja2',
        }),
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, 'frontend/rust'),
            extraArgs: '--no-typescript',
            outDir: '../pkg',
        }),
    ],
};
