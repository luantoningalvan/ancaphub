const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output:{
    path: __dirname + '/public',
    filename: './app.js',
    publicPath: '/'
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
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ],
  module:{
    rules:[
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
      ],
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader']
    }
    ]
  }
}