import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import baseConfig from "./webpack.config";

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSSVendor = new ExtractTextPlugin({
  filename: "bundle.vendor.css"
});
const extractCSS = new ExtractTextPlugin({ filename: "bundle.css" });

export default merge(baseConfig, {
  devtool: "source-map",

  entry: path.join(__dirname, "src/index.js"),

  target: "electron-renderer",

  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "../dist/",
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: extractCSSVendor.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            "postcss-loader"
          ]
        })
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: extractCSS.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                camelCase: true,
                modules: true,
                localIdentName: "[name]__[local]___[hash:base64:5]"
              }
            },
            "postcss-loader"
          ]
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        query: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },

  plugins: [
    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production"
      )
    }),

    extractCSSVendor,
    extractCSS,

    new BundleAnalyzerPlugin({
      analyzerMode:
        process.env.OPEN_ANALYZER === "true" ? "server" : "disabled",
      openAnalyzer: process.env.OPEN_ANALYZER === "true"
    })
  ]
});
