const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    ],
};
