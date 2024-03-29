var webpack = require("webpack");
var path = require("path");
var TerserPlugin = require("terser-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, "public");

module.exports = env => {
  const isDev = env == "development" || env == "isolated";

  return {
    entry: {
      index: __dirname + "/components/index.js"
    },
    output: {
      path: BUILD_DIR,
      filename: isDev ? "<%=antd%>.[name].bundle.js" : "[name].[hash].bundle.js",
      sourceMapFilename: "[name].[hash].bundle.map",
      publicPath: "/",
      library: "<%=antd%>",
      libraryTarget: "var"
    },
    optimization: {
      removeEmptyChunks: true,
      noEmitOnErrors: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            sourceMap: true,
            mangle: true,
            compress: {
              drop_console:false
            }
          }
        })
      ]
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader"
            },
            {
              loader: "less-loader",
              options: {
                javascriptEnabled: true
              }
            }
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: [/node_modules/, /public/],
          loader: "babel-loader"
        }
      ]
    },
    externals: {
      UniversalDashboard: "UniversalDashboard",
      $: "$",
      react: "react",
      "react-dom": "reactdom",
      "react-router-dom": "reactrouterdom"
    },
    resolve: {
      extensions: [".json", ".js", ".jsx"]
    },
    devtool: "source-map",
    devServer: {
      disableHostCheck: true,
      historyApiFallback: true,
      port: 10000,
      // hot: true,
      compress: true,
      publicPath: "/",
      stats: "minimal"
    }
  };
};
