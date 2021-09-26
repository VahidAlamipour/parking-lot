const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
module.exports = {
    entry: "./src/index.js",
    plugins: [new HtmlWebpackPlugin({
        template: "./src/template.html",
        inject: "body"
    })],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /nodeModules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
}