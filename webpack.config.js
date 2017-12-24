import path from "path";
import webpack from "webpack";

module.exports = {
  watch: true,
  target: "electron",
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx", ".json"],
    modules: [path.join(__dirname, "src"), "node_modules"]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production"
      )
    }),

    new webpack.NamedModulesPlugin()
  ]
};
