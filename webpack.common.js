var webpack = require('webpack');
var GitRevisionPlugin = require('git-revision-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin')

let gitRevisionPlugin = new GitRevisionPlugin()

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            { test: /\.tsx?$/, use: { loader: 'ts-loader' } },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: './bundle.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "Passwordmaker",
            filename: "index.html",
            minify: true,
            hash: true,
            meta: {
                "apple-mobile-web-app-capable": "yes"
            }
        }),
        new webpack.DefinePlugin({
            'COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash().substring(0, 6)),
        }),
        new FaviconsWebpackPlugin({
            // Your source logo
            logo: './src/images/logo.png',
            title: 'Passwordmaker',
            background: "#363644"
        }),
    ]
};