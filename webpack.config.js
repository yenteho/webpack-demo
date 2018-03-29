const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const isProd = process.env.NODE__ENV === 'production'; // true or false
const cssDev = ['style-loader','css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [ 'css-loader', 'sass-loader' ]
})
const cssConfig = isProd ? cssProd : cssDev;

module.exports   = {
    entry: {
      app: './src/app.js',
      contact: './src/contact.js'
    },
    output: {
      path:   path.resolve(__dirname, 'dist'),
      filename:   '[name].bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.scss$/,
            // use: ['style-loader','css-loader', 'sass-loader']
            use: cssConfig
          },
          {
            test: /\.pug$/,
            use: ['html-loader', 'pug-html-loader']
           },
           { 
             test: /\.js$/, 
             exclude: /node_modules/, 
             loader: "babel-loader" },
           {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader?name=/img/[name].[ext]"
            }
        ]
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      hot: true,
      port: 9000,
      stats: "errors-only",
      open: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Project',
        minify: {
          collapseWhitespace: true
        },
        hash: true,
        excludeChunks: ['contact'],
        template: './src/index.html' //load a custom template
      }),
      new HtmlWebpackPlugin({
        title: 'Contact',
        hash: true,
        chunks: ['contact'],
        filename: 'contact.html',
        template: './src/contact.html'
      }),
      new  ExtractTextPlugin({
        filename: "style.css",
        disable: !isProd
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ]
};