const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

const APP_NAME = 'FirstRust';

module.exports = {
    mode: 'development',
    entry: './frontend/index.js',
    output: {
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: APP_NAME,
        }),
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, 'frontend/rust'),
            extraArgs: '--no-typescript',
            forceMode: 'production',
            outDir: path.resolve(__dirname, 'frontend/pkg'),
        }),
    ],
};
