'use strict';

var webpack = require('webpack');

const Jarvis = require('webpack-jarvis');

var baseWebpackConfig = require('./webpack.config');

baseWebpackConfig.devServer = {
  compress: true,
  historyApiFallback: true,
  port: 8888,
  host: '127.0.0.1',
  inline: true,
  //quiet: true,   // important
  open: true
}

baseWebpackConfig.plugins.push(

  new Jarvis({
    port: 1337 // optional: set a port
  }),

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    },
    WRA_URL:'http://10.10.15.86:8888'
  })
)

baseWebpackConfig.devtool = '#source-map'

module.exports = baseWebpackConfig
