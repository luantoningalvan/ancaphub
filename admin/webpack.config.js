const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = true
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output:{
    path: __dirname + '/public',
    filename: './bundle.js',
    publicPath: '/',
  },
  devServer:{
    port:8080,
    contentBase: './public',
    historyApiFallback: true,
  },
  resolve:{
    extensions: ['*', '.js', '.jsx'],
    alias:{
      modules: __dirname + '/node_modules'
    }
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  module:{
    rules:[
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        "css-loader"
      ]
    },
    {
      test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
      use: ['file-loader']
    },
    {
      test: /\.svg$/,
      loader: 'svg-inline-loader'
    }
    ]
  }
}