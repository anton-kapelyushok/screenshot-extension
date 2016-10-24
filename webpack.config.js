const path = require('path');
const PATHS = require('./paths');

module.exports = {
    context: __dirname,
    entry: PATHS.entryPoints,
    output: {
        path: path.join(__dirname, PATHS.build),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader' ,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /.html$/,
                loader: 'html-loader',
            },
            {
                test: /.json$/,
                loader: 'json-loader',
            }
        ]
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src')
        },
        extensions: [ '', '.js' ]
    },
    node: {
        console: false,
        global: true,
        process: true,
        Buffer: true,
        __filename: "mock",
        __dirname: "mock",
        setImmediate: true
    }
};
