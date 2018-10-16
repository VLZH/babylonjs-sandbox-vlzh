const webpack = require("webpack");
const path = require("path");

const autoprefixer = require("autoprefixer");
const precss = require("precss");

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            {
                include: [path.resolve(__dirname, "src")],
                loader: "babel-loader",

                options: {
                    plugins: ["syntax-dynamic-import"],

                    presets: [
                        [
                            "env",
                            {
                                modules: false
                            }
                        ]
                    ]
                },

                test: /\.js$/
            },
            {
                test: /\.css$/,

                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",

                        options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",

                        options: {
                            plugins: function() {
                                return [precss, autoprefixer];
                            }
                        }
                    }
                ]
            }
        ]
    },

    entry: "./src/index.ts",

    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist")
    },

    mode: "development",
    watch: true

    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             vendors: {
    //                 priority: -10,
    //                 test: /[\\/]node_modules[\\/]/
    //             }
    //         },

    //         chunks: "async",
    //         minChunks: 1,
    //         minSize: 30000,
    //         name: true
    //     }
    // }
};
