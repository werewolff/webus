// webpack v4
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        app: ['babel-polyfill','./src/index.js']
    },
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, 'public'),
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        modules: ['node_modules'],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(css|scss|sass)$/,
                exclude: /node_modules/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]',


                        },
                    },
                ],
            }
        ]

    },

    devServer:{
        historyApiFallback: true,
        contentBase: [path.join(__dirname, '/'), path.join(__dirname, '/images')],
        port: '8080',
        proxy : { '/api' : 'http://127.0.0.1:8000' },
        disableHostCheck: true,
        hot: true,
        inline: true,
        compress: true,
    },

    optimization: {
        sideEffects: false,
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false,
                    },
                },
                parallel: true,
            }),
        ],
    },

    plugins: [
        new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin('public', {} ),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash(),
        new webpack.HotModuleReplacementPlugin()
    ]
};