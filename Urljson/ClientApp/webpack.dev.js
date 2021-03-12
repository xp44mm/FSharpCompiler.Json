const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
   mode: 'development',

   devtool: 'eval-source-map',

   devServer: {
      port: 3000,
      disableHostCheck: true,
   },

   optimization: {
      runtimeChunk: 'single',
      //removeAvailableModules: false,
      //removeEmptyChunks: false,
      splitChunks: {
         chunks: 'all',
      },
   }

})
