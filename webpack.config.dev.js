import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import { spawn } from "child_process";
import baseConfig from "./webpack.config";

const port = process.env.PORT || 3000;
const publicPath = `http://localhost:${port}/dist`;

export default merge(baseConfig, {
  devtool: "inline-source-map",

  entry: {
    app: [
      "react-hot-loader/patch",
      `webpack-dev-server/client?http://localhost:${port}/`,
      "webpack/hot/only-dev-server",
      path.join(__dirname, "src/index.js")
    ]
  },

  output: {
    publicPath: `http://localhost:${port}/dist/`
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            plugins: [
              /*"react-hot-loader/babel"*/
            ]
          }
        }
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
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
    // https://webpack.js.org/concepts/hot-module-replacement/
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    // turn debug mode on.
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],

  /**
   * https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
   */
  target: "electron-renderer",
  devServer: {
    port,
    publicPath,
    compress: true,
    noInfo: true,
    stats: "errors-only",
    inline: true,
    lazy: false,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    contentBase: path.join(__dirname, "dist"),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
    },
    before() {
      if (process.env.START_HOT) {
        console.log("Staring Main Process...");
        spawn("npm", ["run", "start-main-dev"], {
          shell: true,
          env: process.env,
          stdio: "inherit"
        })
          .on("close", code => process.exit(code))
          .on("error", spawnError => console.error(spawnError));
      }
    }
  }
});
