const webpack = require('webpack');

module.exports = {
  // Sizning boshqa Webpack sozlamalaringiz...
  
  plugins: [
    new webpack.ProvidePlugin({
      global: 'window'
    })
  ]
};
