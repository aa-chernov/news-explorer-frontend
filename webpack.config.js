const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: {
    main: './src/js/index.js',
    articles: './src/js/articles/index.js',
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./[name]/[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe|jpeg|gif|ico|svg)$/i,
        use: [
          {
            loader: "file-loader?name=./images/[name].[ext]"
          },
          {
            loader: "image-webpack-loader",
            options: {

            },
          }
        ],
        exclude: /node_modules/
      },

      {
        test: /\.css$/i,
        use: [
          isDev ?
            "style-loader"
            :
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: "../"
              }
            },
          "css-loader",
          "postcss-loader",
        ]
      },

      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        loader: "file-loader?name=./vendor/[name].[ext]",
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/style.[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/i,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default"],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'index.html',
      template: './src/pages/index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'articles.html',
      template: './src/pages/articles.html',
      chunks: ['articles'],
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};