const CopyWebpack = require('copy-webpack-plugin')
//const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/app/script.js",
  output: {
    filename: "./script.js",
  },
   plugins: [
    new CopyWebpack ({
        patterns: [
            {
                from: './src/public/img/',
                to: './img',
            },
            {
                from: './src/public/index.html',
                to: './index.html',
            },
            {
                from: './src/style/style.css',
                to: './style.css',
            },
        ],
    }),
   ],

};
