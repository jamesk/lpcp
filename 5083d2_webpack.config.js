const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSSVendor = new ExtractTextPlugin({
  filename: "bundle.vendor.css"
});
const extractCSS = new ExtractTextPlugin({ filename: "bundle.css" });

module.exports = {
  watch: true,
  target: "electron",
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    publicPath: "build/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
        /*,
        options: {
          presets: ["react"]
        }*/
      },
      /* {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          },
          "postcss-loader"
        ]
      },*/
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
    extractCSSVendor,
    extractCSS
    /*
    new ExtractTextPlugin({
      filename: "bundle.css",
      disable: false,
      allChunks: true
    })*/
  ]
};
