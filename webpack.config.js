const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports   = {
    entry:   './src/app.js',
    output: {
      path:   path.resolve(__dirname, 'dist'),
      filename:   'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [ 'css-loader', 'sass-loader' ],
                  publicPath: '/dist'
                })
          },
          {
            test: /\.pug$/,
            use: ['html-loader', 'pug-html-loader']
           },
           {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader:'file-loader'
            }
        ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Project',
        minify: {
          collapseWhitespace: true
        },
        hash: true,
        template: './src/index.pug'
      }),
      new   ExtractTextPlugin("styles.css")
    ]
};