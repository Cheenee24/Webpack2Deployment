var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  "faker",
  "lodash",
  "react",
  "react-dom",
  "react-input-range",
  "react-redux",
  "react-router",
  "redux",
  "redux-form",
  "redux-thunk",
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'//name will replace the key from the Entry section
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    /** 
     * this will exclude or remove duplicate
     * the vendor files in the bundle.js
    */
    new webpack.optimize.CommonsChunkPlugin({
      /** manifest tells weather a vendor file has change */
      names: ['vendor', 'manifest']
    }),
    /**
     * this will automatically include
     * dynamic script src in the build
     */
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    /**
     * this is used to defined windows scope varibles
     */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })


  ]
};
