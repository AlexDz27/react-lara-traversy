const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: './resources/webpack.entry.js',
    output: {
        path: path.resolve('./public'),
        filename: 'js/index.js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),
        new webpack.ProvidePlugin({
            'React': 'react'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
                    }
                }
            },
            {
                test: /\.(scss|css)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            }
        ]
    },
    resolve: { extensions: ['.js', '.jsx'] } // enable imports without writing .js/.jsx file extensions
};
