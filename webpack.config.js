const path = require("path");

module.exports = {
    entry: ["babel-polyfill", "./src/app.jsx"],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "app.bundle.js"
    },
    module: {
        loaders: [
            {
                test: [/\.js$/, /\.jsx$/],
                loader: "babel-loader"
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
            },
            {
                test: /\.css/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: "file-loader"
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
        extensions: [".js", ".jsx"],
    },
    devtool: "source-map"
};
