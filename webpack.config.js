const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: [/\.js$/, /\.jsx$/],
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            }
        ]
    },
    stats: {
        colors: true
    },
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: ['.js', '.jsx'],
    },
    devtool: 'source-map'
};
