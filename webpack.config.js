const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV === 'development';

module.exports = {
    mode: process.env.NODE_ENV ?? 'development',

    target: devMode ? 'web' : 'browserslist',
    
    devtool: devMode ? 'eval-cheap-module-source-map' : false,

    entry: {
        main: './src/js/main.js',
        donate: './src/js/donate.js',
    },

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'assets/js/[name].js',
        clean: true,
        // assetModuleFilename: 'assets/[name][ext]',
    },

    devServer: {
        open: true,
        port: 3000,
        hot: true,
        compress: true,
        client: { overlay: true, },
    },

    plugins: [
                new HtmlWebpackPlugin({
                    title: 'PetStory',
                    inject: true,
                    template: './src/html/main.html', 
                    filename: 'index.html',
                    chunks: ['main'],
                }),

                new HtmlWebpackPlugin({
                    title: 'Donate',
                    inject: true,
                    template: './src/html/donate.html', 
                    filename: 'pages/donate.html',
                    chunks: ['donate'],
                }),

                new MiniCssExtractPlugin({ filename: 'assets/css/[name].css', }),
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
                            generator: { filename: 'assets/fonts/[name][ext]', },
                        },

                        {
                            test: /\.(ico|svg|png|jpe?g|webp|gif)$/i,
                            type: 'asset/resource',
                            generator: { filename: 'assets/img/[ext]/[name][ext]', },
                        },
                    ],
            },
    optimization: { splitChunks: { chunks: 'all' }, },
};