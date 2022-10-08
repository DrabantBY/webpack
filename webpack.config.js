const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV === 'development';

module.exports = {
    mode: process.env.NODE_ENV ?? 'development',

    target: devMode ? 'web' : 'browserslist',
    
    devtool: devMode ? 'eval-cheap-module-source-map' : false,

    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
        assetModuleFilename: 'assets/[name][ext]',
    },

    devServer: {
        open: true,
        port: 3000,
        hot: true,
        client: { overlay: true, },
    },

    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html', }),
        new MiniCssExtractPlugin({ filename: '[name].[contenthash].css', }),
    ],

    module: {
        rules: [
            {
                test: /\.m?js$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },

            {
                test: /\.html$/i,
                loader: "html-loader",
            },

            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    {
                        loader: "postcss-loader",
                        options: { 
                            postcssOptions: {
                                plugins: [ ['postcss-preset-env', {}] ],
                            },
                        },

                    },
                ],
            },

            {
                test: /\.woff2?$/i,
                type: 'asset/resource',
                generator: { filename: 'fonts/[name][ext]', }
            },

            {
                test: /\.(svg|png|jpe?g|webp|gif)$/i,
                type: 'asset/resource',
                use: {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: { progressive: true, },
                        optipng: { enabled: false, },
                        pngquant: { quality: [0.65, 0.90], speed: 4 },
                        gifsicle: { interlaced: false, },
                        webp: { quality: 75 },
                    },
                },    
            },
        ],
    },
};