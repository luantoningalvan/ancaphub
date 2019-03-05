const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output:{
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js'
  },
  devServer:{
    port:8080,
    contentBase: './public'
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