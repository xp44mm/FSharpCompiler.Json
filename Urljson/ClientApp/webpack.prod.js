const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
   mode: 'production',
   externals: {
      "rxjs": "rxjs",
      "rxjs/operators": "rxjs.operators",
   },

})
