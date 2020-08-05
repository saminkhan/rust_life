const common = require('./webpack.common');
const merge = require('webpack-merge');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = merge(common, {
    mode: 'development',
    optimization: {
        splitChunks: {
            cacheGroups: {
                deps: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'deps',
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [new LiveReloadPlugin({ appendScriptTag: true })],
});
